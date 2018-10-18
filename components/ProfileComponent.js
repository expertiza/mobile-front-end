import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {fetchInstitutions} from './../redux/actions/Profile';
import {SecureStore} from 'expo';

const mapStateToProps = state => {
    return {
        institutions: state.institutions.institutions,
        jwt : state.auth.jwt
    }
}
const mapDispatchToProps = dispatch => ({
    fetchInstitutions: (jwt) => dispatch(fetchInstitutions(jwt))
})

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.props.fetchInstitutions(this.props.jwt);
    }
    static navigationOptions = {
        title: 'Profile  '
    };
    render(){
        if(this.props.institutions){
            return(
                <Text> This is profile page {console.log(this.props.jwt)} </Text>
            )
        }
        else{
            return(
                <View> LOL </View>
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
