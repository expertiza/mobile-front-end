import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { SecureStore } from 'expo';



class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.performLogout();
  }

  performLogout = () => {
    SecureStore.deleteItemAsync('jwt')
    .then(()=>SecureStore.deleteItemAsync('userinfo'))
    .then(()=>this.props.navigation.navigate('Auth'))
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logout;