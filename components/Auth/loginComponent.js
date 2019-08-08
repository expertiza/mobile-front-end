import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import { SecureStore } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: true
        }
    }
    // componentDidMount(){
    //     SecureStore.getItemAsync('userinfo')
    //     .then(()=>this.props.navigation.navigate('AuthLoading'))
    //     .catch((err)=>console.log(err)) 
    // }
    static navigationOptions = {
        title: 'Login   ',
        tabBarIcon: ({ tintColor }) => (
            <Icon
              name='sign-in'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
        )
    };
    handleLogin() {
        console.log(JSON.stringify(this.state));
        SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
        .then(()=>this.props.navigation.navigate('AuthLoading')) 
        .catch((error) => console.log('Could not save user info', error));
    }
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login  "
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#a90201"
                        }}
                        />
                </View>
            </View>
        );
    }
  }

  class RegisterTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
    };

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <Text> Register Tab!!</Text>   
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: "#a90201",
        inactiveBackgroundColor: '#c21807',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#fffff0'
    }
});

export default LoginTab;