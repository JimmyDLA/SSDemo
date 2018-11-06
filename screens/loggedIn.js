import React from 'react';
import { StyleSheet, Text, View, TabNavigator, Icon } from 'react-native';


class LoggedIn extends React.Component {
  render() {
    const navigate = this.props.navigation.state.params.user;
    console.log('params= ' + JSON.stringify(this.props.navigation.state.params));
    return (
      <View style={styles.container}>
        <Text style={styles.font}>Logged In To:</Text>
        <Text style={styles.font}>{navigate.user.email_address}</Text>
        <Text style={styles.font}>ID: {navigate.user.id}</Text>
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
  font: {
    fontSize: 20
  }
});

export default LoggedIn;
