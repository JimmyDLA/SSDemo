import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TabNavigator, Icon, PermissionsAndroid } from 'react-native';


class Gps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      // error: null,
    };
  }

//   requestGPSPermission() {
//   try {
//     const granted =  PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         'title': 'GPS Permission',
//         'message': 'Cool GPS Location App needs to access you phone ' +
//                    'so we can spy on millions.'
//       }
//     )
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the GPS")
//     } else {
//       console.log("GPS permission denied")
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }

  getGPS = () => {
    console.log("click!");
    navigator.geolocation.getCurrentPosition(
      (geo_success) => {
        console.log(geo_success);
        this.setState({
          latitude: geo_success.coords.latitude,
          longitude: geo_success.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message })
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.getGPS}>
          <Text style={styles.txtBut}> Get GPS </Text>
        </TouchableOpacity>
        <Text> LAT: {this.state.latitude}</Text>
        <Text> LNG: {this.state.longitude}</Text>
      </View>
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
  txtBut: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    backgroundColor: 'rgb(30,144,255)',
    height: 50,
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center'
  }
});

export default Gps;
