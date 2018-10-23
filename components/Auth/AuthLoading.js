import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Image } from 'react-native';
import { SecureStore } from 'expo';
import * as actions from '../../redux/index';
import { connect } from 'react-redux';
import FadeInView from '../UI/LoadingComponent';

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
       onSubmit: (name, password) => {dispatch(actions.auth(name, password))},
  }
}

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.performAuth();
  }

  performAuth = () => {
    SecureStore.getItemAsync('userinfo')
    .then((userdata) => {
        let userinfo = JSON.parse(userdata);
        if (userinfo) {
          console.log("was here")
          this.props.onSubmit(userinfo.username, userinfo.password)
          setTimeout(() => { 
            SecureStore.getItemAsync('jwt')
          .then((jwt) => this.props.navigation.navigate(jwt ? 'App' : 'Auth'))
          .catch((err)=>console.log(err)) 
          }, 3000);
        }
        else{
            this.props.navigation.navigate('Auth')
        }
    })
    .catch((err)=> {console.log(err)})
  }

  render() {
    return (
      <View style={styles.container}>
         <FadeInView>
          <Image source={require('../../assets/images/logo.png')} />
        </FadeInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#a90201',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});

export default connect(mapStatetoProps,mapDispatchToProps)(AuthLoadingScreen);