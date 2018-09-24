import * as actions from '../redux/index'
import React, { Component } from 'react';
import { Text } from 'react-native';
class Profile extends Component {
    constructor(props) {
        super(props);
        auth('student7', password);
    }
    static navigationOptions = {
        title: 'Profile  '
    };
    render(){
        return(
        <Text> This is profile page </Text>
        )
    }
}
export default Profile;
