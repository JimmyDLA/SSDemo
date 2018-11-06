console.disableYellowBox = true;

import React from 'react';
import { StyleSheet, Text, View, TabNavigator, Icon } from 'react-native';
import {Root} from './config/router';
import { RNCamera, FaceDetector } from 'react-native-camera';

// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';


export default class App extends React.Component {
  render() {
    return (
      <Root/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
