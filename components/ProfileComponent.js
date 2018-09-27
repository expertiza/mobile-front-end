import * as actions from '../redux/index'
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import {fetchInstitutions} from './../redux/actions/Profile';

const mapStateToProps = state => {
    return {
        institutions: state.institutions.institutions
    }
}
const mapDispatchToProps = dispatch => ({
    fetchInstitutions: () => dispatch(fetchInstitutions())
})

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        this.props.fetchInstitutions();
    }
    static navigationOptions = {
        title: 'Profile  '
    };
    render(){
        if(this.props){
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
