import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Modal, TouchableWithoutFeedback, TouchableOpacity,  Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import { SecureStore } from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../redux/index';

const mapStatetoProps = state => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        passwordResetEmailSend: (name) => {dispatch(actions.passwordResetEmailSend(name))},
    }
  }

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            remember: true,
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

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
            <KeyboardAvoidingView style={[styles.container, this.state.modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}
                behavior="padding" enabled>
                <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                }}>
                         <TouchableOpacity 
                            style={styles.container} 
                            activeOpacity={1} 
                            onPressOut={() => {this.setModalVisible(false)}}
                        >
                        <View style={styles.Modal} behavior="padding" enabled>
                            <TouchableWithoutFeedback>
                            <View style = {styles.Modalcontent}>
                                <Text h4 style={styles.modalheader}>Forgot Password?</Text>
                                <Text>Enter your email to request a password reset</Text>
                                <Input
                                    placeholder="email"
                                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                                    onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    containerStyle={styles.formInput}
                                    style = {styles.modalinput}
                                />
                                <Button
                                    onPress={() =>{ 
                                            this.props.passwordResetEmailSend(this.state.email);
                                            this.setModalVisible(!this.state.modalVisible);
                                            alert('check your email');
                                        }
                                    }
                                    title="Request  "
                                    icon={
                                        <Icon
                                            name='paper-plane'
                                            type='font-awesome'
                                            size={24}
                                            color= 'white'
                                        />
                                    }
                                    buttonStyle={{
                                        backgroundColor: "#a90201"
                                    }}
                                />
                                <Button
                                    onPress={() => {
                                        
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                    title="Cancel  "
                                    icon={
                                        <Icon
                                            name='close'
                                            type='font-awesome'
                                            size={24}
                                            color= 'white'
                                        />
                                    }
                                    buttonStyle={{
                                        marginTop: 20,
                                        backgroundColor: "#7b7b7b"
                                    }}
                                />
                                
                            </View>
                            </TouchableWithoutFeedback>
                        </View>                           
                    </TouchableOpacity>
                </Modal>
               <Image source={require('./../../assets/images/logo.png')} style= {styles.img}/>
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
                    <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{fontSize: 15, alignSelf: 'flex-end', marginRight: 20}}>Forgot password?</Text>
                    </TouchableOpacity>
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
            </KeyboardAvoidingView>
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
        flex: 1,
        padding: 20,
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 30,
        height: 50
    },
    img: {
        alignSelf: "center",
        marginBottom: 20,
        marginLeft: 10,
    },
    Modal: {
        height: 350,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: 'white',
        marginTop: 400,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 200,
        borderRadius: 25,
    },
    Modalcontent: {
        alignSelf: 'stretch',
        paddingLeft: 30,
        paddingRight: 30
    },
    modalheader: {
        marginTop: 20,
        paddingBottom: 30,
    },
    modalinput: {
        marginTop: 40,
        paddingBottom: 30
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

export default connect(mapStatetoProps,mapDispatchToProps)(LoginTab);
