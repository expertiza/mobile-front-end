import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {fetchInstitutions} from './../redux/actions/Profile';
import {SecureStore} from 'expo';

const mapStateToProps = state => {
    return {
        institutions: state.institutions.institutions
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
        SecureStore.getItemAsync('jwt')
        .then((jwt)=>{
            const token = JSON.parse(jwt)
            this.props.fetchInstitutions(token.jwt);
        })
    }
    static navigationOptions = {
        title: 'Profile  '
    };
    render(){
        if(this.props.institutions){
            return(
                <Text> This is profile page {console.log(this.props.institutions)} </Text>
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
