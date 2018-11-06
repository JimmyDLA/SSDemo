import React from 'react';
import { StyleSheet, Text, View, TabNavigator, SectionList, TouchableOpacity } from 'react-native';
// import { IDFA } from '@ptomasroos/react-native-idfa';


// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class NativeAPI extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      IDFA: '',
    }
  }
  componentDidMount() {
    // IDFA.getIDFA().then((idfa) => {
    //   this.setState({ IDFA: idfa, });
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  }


  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
    console.log("count = " + this.state.count);
  }

  onMobileAD = () => {
    this.props.navigation.navigate('MobileADID');

  }

  onLoadCam = () => {
    this.props.navigation.navigate('Cam');
  }

  onGps = () => {
    this.props.navigation.navigate('GPS')
  }


  render() {
    // const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onLoadCam}>
          <Text style={styles.txtBut}> Camera </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.onMobileAD}>
          <Text style={styles.txtBut}> Mobile Ad ID </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.onGps}>
          <Text style={styles.txtBut}> GPS </Text>
        </TouchableOpacity>

        {/* <SectionList
          renderItem={({ item, index, section }) => <Text key={index} style={styles.items}>{item}</Text>}
          renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold', fontSize: 20, width: '100%' }}>{title}</Text>}
          sections={[
            { title: 'Mobile AD ID', data: ['Get Mobile Ad ID'] },
            { title: 'Geolocation', data: ['Get Loction Now'] },
            { title: 'Camera', data: ['Access Camera'] },
          ]}
          style={styles.section}
          keyExtractor={(item, index) => item + index}
        /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(230,230,230)',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'rgb(30,144,255)',
    height: 50,
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center'
  },
  txtBut: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  section: {
    top: 100,
    width: '100%',
  },
  items: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    borderWidth: 1,
  }
});


export default NativeAPI;
