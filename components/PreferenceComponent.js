import * as actions from '../redux/index'
import React, { Component } from 'react';
import { Text, ScrollView, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import {fetchProfile, editProfile} from '../redux/actions/Profile';
import PreferenceView from './PreferenceComponentView';

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}
const mapDispatchToProps = dispatch => ({
    fetchProfile: () => dispatch(fetchProfile()),
    editProfile: (profile,aq) =>{dispatch(editProfile(profile,aq))}
})

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state= this.propsToState(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNotificationChange = this.handleNotificationChange.bind(this);
    this.performedit = this.performedit.bind(this);
  }

  static navigationOptions = {
    title: 'Preference  '
  };

  propsToState(props) {
    return {
      profileform : {
        fullname: props.profile.profile.fullname,
        password: '',
        email: props.profile.profile.email,
        institution_id: props.profile.profile.institution_id,
        email_on_review: props.profile.profile.email_on_review,
        email_on_submission: props.profile.profile.email_on_submission,
        email_on_review_of_review: props.profile.profile.email_on_review_of_review,
        copy_of_emails: props.profile.profile.copy_of_emails,
        handle: props.profile.profile.handle,
        timezonepref: props.profile.profile.timezonepref,
      },
      aq : {
        notification_limit: props.profile.aq==null?null:props.profile.aq.notification_limit
      },
      touched: {
        password: false,
        confirmpassword: false
      },
      confirmpassword: '',
      save: false,
    };
  }

  componentDidMount(){
    this.props.fetchProfile()
      .then(() => {this.setState(this.propsToState(this.props))});
  }

  performedit(){
    this.props.editProfile(this.state.profileform, this.state.aq);
  }

  handleSubmit() {
    this.setState({ save: true}, ()=>{console.log(this.state.save); this.performedit()});
  }

  handleInputChange = (field) => (value) => {
    var profileform = {...this.state.profileform};
    profileform[field] = value;
    this.setState({profileform});
  }

  handleNotificationChange(event){
      const value = event.target.value;
      var aq = {...this.state.aq};
      aq['notification_limit'] =  value;
      this.setState({aq});
  }

  render(){
    if(this.props){
      // console.log('render(): this.state:', this.state);
      // console.log('render(): this.props.profile:', this.props.profile);
      return(<PreferenceView
          profileform={this.state.profileform}
          handleInputChange={this.handleInputChange}
          handleNotificationChange={this.handleNotificationChange}
          handleSubmit={this.handleSubmit}
      />);
    } else {
      return(
        <View>
          LOL
        </View>
      )
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Preference);
