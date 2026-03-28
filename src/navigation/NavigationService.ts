import * as React from 'react';
import {StackActions} from '@react-navigation/routers';
import {
  DrawerActions,
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import reactotron from '../redux/reactotron';
import {store} from '../redux/store';
import {setStackIndex} from '../redux/reducers/General/navigator';

export const navigationRef = createNavigationContainerRef<any>();
export const isReadyRef = React.createRef<null>();

function navigate(name: string, params?: any) {
  if (navigationRef.isReady() && params?.screen) {
    navigationRef.navigate(name, {
      screen: params.screen,
      params: params,
    });
  } else if (navigationRef.isReady()) {
    // if (
    //   name === 'ESDashboard' &&
    //   store.getState().userDataStored.userData == null &&
    //   store.getState().userToken.userHasProfiles != 'no'
    // ) {
    //   navigationRef.navigate('SelectProfile', {...params, screen: name});
    // } else {
    if (
      name === 'ILDashboard' &&
      store.getState().userILData.userILData == null
    ) {
      navigationRef.navigate('SwitchFactories', {...params, screen: name});
    } else {
      navigationRef.navigate(name, params);
    }
  }
  // }
}

export function goToRoot() {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.popToTop());
    store.dispatch(setStackIndex(0));
  }
}
function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.current &&
      navigationRef.current.dispatch(StackActions.replace(name, params));
  }
}

function openDrawer() {
  navigationRef.isReady() &&
    navigationRef.current &&
    navigationRef.current.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  navigationRef.current &&
    navigationRef.current.dispatch(DrawerActions.closeDrawer());
}
function reset(routeName: string, params?: any) {
  navigationRef.current &&
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
}

export default {
  navigate,
  goBack,
  replace,
  openDrawer,
  closeDrawer,
  reset,
  goToRoot,
};
