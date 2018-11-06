import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


import Gps from '../screens/gps';
import Login from '../screens/login';
import Camera from '../screens/camera'
import Coupons from '../screens/coupons';
import LoggedIn from '../screens/loggedIn';
import Settings from '../screens/settings';
import NativeAPI from '../screens/nativeApi';
import MobileAdID from '../screens/mobileAdID';
import CouponDetail from '../screens/couponDetail'




export const LogStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      header: null
    }
  },
  LoggedIn: {
    screen: LoggedIn,
    navigationOptions: {
      title: 'Logged In'
    }
  }
});

export const CouponStack = StackNavigator({
  Coupons: {
    screen: Coupons,
    navigationOptions: {
      title: 'All Coupons',
    }
  },
  CouponDetail: {
    screen: CouponDetail,
    navigationOptions: {
      title: 'Coupon Detail',
			header: null
    }
  }
});

export const NativeStack = StackNavigator({
  NativeAPI: {
    screen: NativeAPI,
    navigationOptions: {
      title: 'Native API'
    }
  },
  MobileADID: {
    screen: MobileAdID,
    navigationOptions: {
      title: 'Mobile AD ID'
    }
  },
  Cam: {
    screen: Camera,
    navigationOptions: {
      title: 'Camera'
    }
  },
  GPS: {
    screen: Gps,
    navigationOptions: {
      title: 'GPS'
    }
  }
})

export const Tabs = TabNavigator({
  Login: {
    screen: LogStack,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="account-circle" size={40} color={tintColor}/>
    },
  },
  Coupons: {
    screen: CouponStack,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="list" size={40} color={tintColor}/>
    },
  },
  NativeAPI: {
    screen: NativeStack,
    navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="code" size={40} color={tintColor}/>
    },
  }
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: Settings
  },
}, {
   mode: 'modal',
   headerMode: 'none',
});
