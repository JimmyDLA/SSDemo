import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View, TabNavigator, Icon } from 'react-native';
import { IDFA } from '@ptomasroos/react-native-idfa';

// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class MobileAdID extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      IDFA: '',
      // count: 0,
      // yourPoke: '',
      // pokemon: '',
      // pic: ''
    }
  }

  onCall = () => {
    console.log('IDFA = '+ JSON.stringify(IDFA));

    IDFA.getIDFA().then((idfa) => {
      this.setState({ IDFA: idfa, });
      console.log(idfa);
    })
    .catch((e) => {
      console.error(e);
    });
    // fetch('https://api1.qa2.savewave.com/oauth/access_token', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/vnd.savingstar; version=3',
    //     // 'Content-Type': 'application/json',
    //   }
    // });

  //   fetch('https://pokeapi.co/api/v2/pokemon/' + this.state.count)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log("Pokemon's Name is: " + responseJson.sprites.front_default);
  //     this.setState({ yourPoke: 'YOUR POKEMON IS... '})
  //     this.setState({ pokemon: responseJson.name})
  //     this.setState({ pic: responseJson.sprites.front_default + ''})
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onCall}>
          <Text style={styles.txtBut}>Get Ad ID</Text>
        </TouchableOpacity>
        <Text>idfa = {this.state.IDFA}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: "20%",
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10
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
  txtRes: {
    padding: 20
  }
});


export default MobileAdID;
