import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// import Coupons from './screens/coupons';
// import Login from './screens/login';
// import NativeAPI from './screens/nativeApi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      email: 'Useless Placeholder',
      password: '',
      channel: 2,
      res:{}
    };
  }

  //FUNCTIONS!

  onLogin = () => {
    Alert.alert(
      'Logging In To...',
      this.state.email + "",
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.getAccessToken()},
      ],
      { cancelable: false }
    )
	}


  onLoggedIn = (user) => {
    this.props.navigation.navigate('LoggedIn', {user});
    console.log("on loggedIn page!!!");
    // console.log("this.state.res.user" + JSON.stringify(this.state.res.user);
    // this.getAccessToken();
  }


  getAccessToken = () => {
    console.log('making POST call!');
    let formdata = new FormData();
    formdata.append("client_id", "4d00ec8ff1bb3e026f000001")
    formdata.append("client_secret", "b614031c84fb9793710a5a3c4a545f5b60a2a909402bb286e42d5464ab5448fe")
    formdata.append("grant_type", "none")
    fetch('http://api10.qa2.savewave.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.savingstar;version=3',
      },
      body: formdata,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('resp: ' + JSON.stringify(responseJson))
      this.setState({
        access_token: responseJson.access_token
      })
      this.loginUser(this.state.email, this.state.password, function(responseJson){
        console.log('this is a callback. res:' + JSON.stringify(responseJson));
        }, function(responseJson){
          Alert.alert(
            'ERROR...',
            responseJson.error.message + "",
            [
              {text: 'Try Again', onPress: () => console.log('try agian Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
          console.log('this is a error callback. res: ' + JSON.stringify(responseJson));
      })
    })
    .catch((error) => {
      console.error('400 or something '+ error);
    });
  }


  loginUser = (email, password, callback, errCallback) => {
    let formdata = new FormData();
    formdata.append("email_address", email)
    formdata.append("password", password)
    formdata.append("channel", this.state.channel)
    console.log("data obj: "+JSON.stringify(formdata));
    fetch('http://api10.qa2.savewave.com/users/auth.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.savingstar;version=3',
		    'Authorization': 'OAuth '+ this.state.access_token,
			  'User-Agent': 'SavingStar/5.3.2 (Revision/4050)'
      },
      body: formdata,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        res: responseJson
      })
      console.log('resp: ' + JSON.stringify(responseJson))
      if (callback && !responseJson.error) {
        this.onLoggedIn(responseJson);
        callback(responseJson);
      }
      if (responseJson.error && errCallback) {
        errCallback(responseJson)
      }
    })
    .catch((error) => {
      console.error('401 or something '+ error);
      if (errCallback) {
        errCallback();
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inline}>
          <View style={styles.header}>
            <View style={styles.backCont}>
              {/* <Icon style={styles.arrowBack} name="arrow-back" size={50} /> */}
            </View>
          </View>
          <View style={styles.textCont}>
            <Text style={styles.textLog}>Log In</Text>
          </View>
          <View style={styles.inputCont}>
            <View style={styles.userCont}>
              <Icon style={styles.userIcon} name="account-circle" color='rgb(9, 132, 227)' size={30}/>
              <TextInput
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                placeholder="User Name"
                autoCorrect={false}
                placeholderTextColor='gray'
              />
            </View>
            <View style={styles.passwordCont}>
              <Icon style={styles.userIcon} name="lock" color='rgb(9, 132, 227)' size={30}/>
              <TextInput
                style={styles.input}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor='gray'
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
            <Text style={styles.butText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.signUpCont}>
            <Text style={styles.firstTime}>First time here?</Text>
            <Button style={styles.signUp} title='Sign up' color='green'/>
          </View>

        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgb(240,240,240)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    top: 30,
    // backgroundColor: 'rgb(220,220,220)',
    height: '90%',
    width: '80%',
    // justifyContent: 'space-bet'
  },
  header: {
    justifyContent: "flex-start"
  },
  backCont: {
    // backgroundColor: 'rgb(210,210,210)',
    height: 80,
    width: '15%',
    justifyContent: 'flex-start'
  },
  arrowBack: {
    height: '100%',
    width: '50%'
  },
  textCont: {
    // backgroundColor: 'rgb(200,200,200)',
    height: 80,
    width: '100%'
  },
  textLog: {
    fontSize: 50,
  },
  inputCont: {
    // backgroundColor: 'rgb(190,190,190)',
    height: 150,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  userCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderBottomWidth: 2
  },
  passwordCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderBottomWidth: 2

  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    fontSize: 20
    // caretHidden: 'false'
    // borderBottonWidthasdf: 1
  },
  button: {
    top: 80,
    height: 80,
    width: '80%',
    backgroundColor: 'rgb(9, 132, 227)',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  butText: {
    color: 'white',
    fontSize: 50,
    alignSelf: 'center',
  },
  signUpCont: {
    top: 90,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  firstTime: {
    height: 20,
    alignSelf: 'center',
    fontSize: 17.5
    // width:
  },
  signUp: {
    // backgroundColor: 'blue'
  }
});

export default Login;
