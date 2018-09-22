import React, { Component } from 'react';
import { Text } from 'react-native';
class Assignment extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Assignments       '
    };
    render(){
        return(
        <Text> This is Assignments page </Text>
        )
    }
}
export default Assignment;
