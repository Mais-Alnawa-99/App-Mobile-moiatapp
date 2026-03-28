import React, {useState, useEffect, Fragment, useRef} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useAppDispatch} from '../../../../../redux/store';
import {getTreeLookupsData} from '../../../../../redux/reducers/E-Services/thunk/services';
import Input from '../../../../../component/input/Input';
import {parseJSON} from '../../../utils';
import Text from '../../../../../component/Text';
import {BW} from '../../../../../style/theme';
import Button from '../../../../../component/Button';

const TreeOptionField = ({
  service,
  formData,
  profId,
  formValues,
  generateDataFromFormValues,
  applicationId,
  field,
  handleChange,
  title,
  setFormValues,
  updateVisibility,
  treeOptions,
  setTreeOptions,
  isRequired,
  required,
  error,
  isDisabled,
}: any) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();

  const settings = field?.formSectionFieldSettings
    ? JSON.parse(field.formSectionFieldSettings)
    : {};
  const fieldId = field?.entityFieldId;

  const treeOptionsRef = useRef();
  const _getTreeLookupsData = () => {
    try {
      let body = {
        EntityFieldId: fieldId,
        Filter: '',
      };

      dispatch(getTreeLookupsData(body)).then(res => {
        if (res.meta.requestStatus === 'fulfilled' && res.payload) {
          if (res.payload.detail != null) {
            let options = !!res.payload.detail && parseJSON(res.payload.detail);
            setTreeOptions((prev: any) => ({
              ...prev,
              [fieldId]: options,
            }));
          } else {
          }
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    !treeOptions?.[fieldId] && _getTreeLookupsData();
  }, []);

  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [stack, setStack] = useState<any[][]>([]);
  const [searchText, setSearchText] = useState('');

  const treeData = treeOptions?.[fieldId] || [];

  useEffect(() => {
    if (treeData.length && stack.length === 0) {
      setStack([treeData]);
    }
  }, [treeData]);

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {},
  );
  const nodeMatchesSearch = (node: any, search: string): boolean => {
    const titleMatch =
      node?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
      node?.title?.includes(search);

    if (titleMatch) return true;

    if (node?.children && node?.children.length > 0) {
      return node?.children.some((child: any) =>
        nodeMatchesSearch(child, search),
      );
    }

    return false;
  };

  const renderTreeItems = (nodes: any[], level = 0) => {
    return nodes
      .filter(node => {
        if (!searchText) return true;
        return nodeMatchesSearch(node, searchText);
      })
      .map(node => {
        const isExpanded = expandedNodes?.[node?.key];
        const hasChildren = node?.children && node?.children.length > 0;

        return (
          <View
            key={node?.key}
            style={{
              paddingLeft: level * 16,
              borderBottomWidth: node?.isLeaf ? 0 : 0.5,
              paddingVertical: 8 * BW(),
              borderBottomColor: colors.gray,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (hasChildren) {
                  setExpandedNodes(prev => ({
                    ...prev,
                    [node?.key]: !prev[node?.key],
                  }));
                } else if (node?.isLeaf) {
                  handleChange(
                    fieldId,
                    {value: node?.key, label: node?.title, lookupId: node?.key},
                    field,
                  );
                  setModalVisible(false);
                  setStack([treeData]);
                }
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6 * BW(),
              }}>
              {hasChildren ? (
                <Text h5>{isExpanded ? '➖' : '➕'}</Text>
              ) : (
                !!node?.isLeaf && (
                  <View
                    style={{
                      borderRadius: 20 * BW(),
                      width: 12 * BW(),
                      height: 12 * BW(),
                      backgroundColor: 'transparent',
                      borderColor: colors.secondaryColor,
                      borderWidth: 1 * BW(),
                      padding: 1.5 * BW(),
                    }}>
                    {node?.key == formValues[fieldId]?.value && (
                      <View
                        style={{
                          backgroundColor: colors.secondaryColor,
                          flex: 1,
                          borderRadius: 20 * BW(),
                        }}
                      />
                    )}
                  </View>
                )
              )}
              <Text
                h4
                style={{
                  width: '90%',
                }}>
                {node?.title}
              </Text>
            </TouchableOpacity>

            {isExpanded &&
              hasChildren &&
              renderTreeItems(node?.children, level + 1)}
          </View>
        );
      });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
          {title && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                h4
                style={{
                  color: colors.text,
                  opacity: isDisabled ? 0.8 : 1,
                }}>
                {title}
              </Text>
              {isRequired && (
                <Icon
                  name="star-of-life"
                  size={6 * BW()}
                  color="#db2c43"
                  style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
                />
              )}
            </View>
          )}
          {
            <View
              style={[
                style.input,
                isDisabled && style.inputDisable,
                {
                  borderColor: required || error ? 'red' : colors.border,
                  borderWidth: required || error ? 0.5 * BW() : 0 * BW(),
                },
              ]}>
              <Text
                h4
                style={{
                  color: isDisabled
                    ? colors.textColor + 'aa'
                    : colors.textColor,
                }}>
                {formValues[fieldId]?.label || ''}
              </Text>
            </View>
          }
        </View>
      </TouchableOpacity>
      {!!error && typeof error == 'string' && (
        <Text style={style.requiredText} h5>
          {error}
        </Text>
      )}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalView}>
            <Button
              onPress={() => setModalVisible(false)}
              icon={require('../../../../../assets/icons/close.png')}
              style={style.btnContainer}
              containerIcon={style.containerIcon}
              styleIcon={style.styleIcon}
            />
            <Input
              placeholder={t('Search')}
              value={searchText}
              onChangeText={setSearchText}
              styleInput={{
                backgroundColor: colors.white,
                marginBottom: 8 * BW(),
              }}
              viewStyle={{marginTop: 0}}
              textInput
            />
            <ScrollView>{renderTreeItems(treeData)}</ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '60%',
      maxHeight: '88%',
    },
    btnContainer: {
      zIndex: 6,
      backgroundColor: 'transparent',
      borderRadius: 0,
      marginBottom: 8 * BW(),
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
      height: 'auto',
    },
    containerIcon: {
      width: 16 * BW(),
      height: 16 * BW(),
    },
    styleIcon: {
      tintColor: colors.secondaryColor,
    },
    inputDisable: {
      color: colors.textColor + 'aa',
      backgroundColor: '#ffffff80',
      borderRadius: 8 * BW(),
      marginTop: 2 * BW(),
      padding: 8 * BW(),
      minHeight: 40 * BW(),
    },
    input: {
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
      borderRadius: 8 * BW(),
      marginTop: 2 * BW(),
      padding: 8 * BW(),
      minHeight: 40 * BW(),
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },
  });

export default React.memo(TreeOptionField);
