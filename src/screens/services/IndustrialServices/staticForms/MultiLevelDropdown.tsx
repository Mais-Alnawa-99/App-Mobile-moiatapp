import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {BH, BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import {useTheme} from '@react-navigation/native';
import Input from '../../../../component/input/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableItem = ({
  item,
  onSelect,
  selected,
  level = 0,
  styles,
  expandedPaths,
  toggleExpandPath,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selected?.id === item.id;
  const expanded = expandedPaths.includes(item.id);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (hasChildren) toggleExpandPath(item.id);
  };

  return (
    <View style={{marginLeft: level * 20, marginVertical: 2 * BW()}}>
      <View style={styles.itemRow}>
        {hasChildren ? (
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.expandTouchable}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text
              style={
                isSelected ? styles.selectedExpandIcon : styles.expandIcon
              }>
              {expanded ? '−' : '+'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.expandPlaceholder} />
        )}
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={styles.itemTouchable}
          activeOpacity={0.7}>
          <Text style={isSelected ? styles.selectedText : styles.itemText}>
            ({item.isiC4Code}) {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      {expanded && hasChildren && (
        <View>
          {item.children.map(child => (
            <ExpandableItem
              key={child.id}
              item={child}
              onSelect={onSelect}
              selected={selected}
              level={level + 1}
              styles={styles}
              expandedPaths={expandedPaths}
              toggleExpandPath={toggleExpandPath}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const MultiLevelDropdown = ({data, onItemSelect, label, value}) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(value);
  const [expandedPaths, setExpandedPaths] = useState([]);
  const [showMainList, setShowMainList] = useState(false);

  const onSelect = item => {
    setSelectedItem(item);
    onItemSelect?.(item);

    setShowMainList(false);
  };

  const toggleExpandPath = id => {
    setExpandedPaths(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id],
    );
  };

  const findPathToItem = (items, targetId, path = []) => {
    for (const item of items) {
      const newPath = [...path, item.id];
      if (item.id === targetId) return newPath;
      if (item.children) {
        const childPath = findPathToItem(item.children, targetId, newPath);
        if (childPath) return childPath;
      }
    }
    return [];
  };

  const filterTree = (items, term) => {
    const lowerTerm = term.toLowerCase();
    return items
      .map(item => {
        const match =
          item.name.toLowerCase().includes(lowerTerm) ||
          item.isiC4Code.toLowerCase().includes(lowerTerm);
        const filteredChildren = filterTree(item.children || [], term);
        if (match || filteredChildren.length) {
          return {
            ...item,
            children: filteredChildren,
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    if (showMainList && selectedItem) {
      const path = findPathToItem(data, selectedItem.id);
      setExpandedPaths(path); // auto-expand only the path to selected node
    } else if (!showMainList) {
      setExpandedPaths([]); // collapse everything on close
    }
  }, [showMainList]);

  const filteredData = searchText ? filterTree(data, searchText) : data;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          h4
          style={{
            color: colors.text,
            zIndex: 500,
          }}>
          {label}
        </Text>

        <Icon
          name="star-of-life"
          size={6 * BW()}
          color="#db2c43"
          style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          setShowMainList(!showMainList);
        }}
        style={[
          styles.selectedContainer,
          selectedItem && {justifyContent: 'space-between'},
        ]}>
        {selectedItem && (
          <Text style={styles.selectedItem}>
            ({selectedItem.isiC4Code}) {selectedItem.name}
          </Text>
        )}
        <AntDesign name={'down'} size={15 * BW()} color={colors.text} />
      </TouchableOpacity>

      {/* {(showMainList || !selectedItem) && (
      
      )} */}

      {showMainList && (
        <View>
          <Input
            textInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            onFocus={() => {
              setShowMainList(true);
            }}
          />
          <View
            style={{
              height: 350 * BH(),
              //position: 'absolute',
              width: '100%',
              zIndex: 111111111,
            }}>
            <ScrollView contentContainerStyle={styles.treeContainer}>
              {filteredData.map(item => (
                <ExpandableItem
                  key={item.id}
                  item={item}
                  onSelect={onSelect}
                  selected={selectedItem}
                  expandedPaths={expandedPaths}
                  styles={styles}
                  toggleExpandPath={toggleExpandPath}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      //flex: 1,
      paddingVertical: 6 * BW(),

      //borderRadius: 8 * BW(),
    },
    searchInput: {
      borderColor: colors.gray,
      borderWidth: 1 * BW(),
      paddingHorizontal: 8 * BW(),
      paddingVertical: 4 * BW(),
      marginHorizontal: 6 * BW(),
      fontSize: 16 * BW(),
      marginBottom: 6 * BW(),
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
    },
    selectedContainer: {
      //marginHorizontal: 16 * BW(),
      marginVertical: 4 * BW(),
      backgroundColor: colors.white,
      padding: 8 * BW(),
      borderRadius: 6 * BW(),
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
    },
    selectedHeader: {
      fontWeight: '700',
      marginBottom: 2 * BW(),
      fontSize: 14 * BW(),
      color: colors.lightPrimaryTextColor,
    },
    selectedItem: {
      fontSize: 11 * BW(),
    },
    treeContainer: {
      paddingBottom: 10 * BW(),
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.white,
      zIndex: 111111,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6 * BW(),
      paddingVertical: BW(),
      // borderColor: 'red',
      // borderWidth: 1,
    },
    expandTouchable: {
      width: 30 * BW(),
      height: 30 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 6 * BW(),
      borderRadius: 15 * BW(),
      backgroundColor: colors.mainBackground,
    },
    expandIcon: {
      fontWeight: 'bold',
      width: 30 * BW(),
      height: 30 * BW(),
      fontSize: 20 * BW(),
      color: colors.lightPrimaryTextColor,
      textAlign: 'center',
    },
    selectedExpandIcon: {
      fontWeight: 'bold',
      width: 30 * BW(),
      height: 30 * BW(),
      fontSize: 20 * BW(),
      color: colors.secondaryColor + '99',
      textAlign: 'center',
    },
    expandPlaceholder: {
      width: 20 * BW(),
      height: 20 * BW(),
      marginRight: 6 * BW(),
    },
    itemTouchable: {
      flex: 1,
      // borderColor: 'red',
      // borderWidth: 1,
      textAlign: 'center',
      // paddingVertical: 3 * BW(),
    },
    itemText: {
      fontSize: 13 * BW(),
      color: colors.text,
    },
    selectedText: {
      fontSize: 14 * BW(),
      //fontWeight: 700,
      color: colors.secondaryColor,
    },
  });

export default MultiLevelDropdown;
