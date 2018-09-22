import React, { Component } from 'react';
import { Text } from 'react-native';
class Profile extends Component {
    constructor(props) {
        super(props);
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
