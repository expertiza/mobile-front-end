import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import * as actions from '../../redux/index';
import ChangeHandleView from './ChangeHandleView';

class ChangeHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_handle: "",
      showHelp: false
    }
    this.handleNameChangeHandler = this.handleNameChangeHandler.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  static navigationOptions = {
    title: 'Change handle   '
  };
  componentDidMount = () => {
    // console.log('ChangeHandle.props.participant: ', this.props.participant);
    this.setState({
      ...this.state,
      participant_handle: this.props.participant.handle
    });
  }
  handleNameChangeHandler = (value) => {
    // console.log('handle change: ', value);
    this.setState({
      ...this.state,
      participant_handle: value
    });
  }
  handleHelp = () => {
    this.setState({
      ...this.state,
      showHelp: !this.state.showHelp
    })
  }
  onSubmitHandler = (e) => {
    this.props.editHandle(this.props.participant.id,
      this.state.participant_handle, this.props.jwt)
    .then(this.props.updateParticipant({
      ...this.props.participant, handle: this.state.participant_handle}))
    .then(() => {
      this.props.navigation.goBack();
    });
  };
  render() {
    // console.log('ChangeHandle.props.participant: ', this.props.participant);
    return (
      <ChangeHandleView participant_handle={this.state.participant_handle}
      showHelp={this.state.showHelp}
      handleNameChangeHandler={this.handleNameChangeHandler}
      handleHelp={this.handleHelp}
      onSubmitHandler={this.onSubmitHandler} />
    );
  }
}

const mapStateToProps = (state) => ({
  participant: state.studentTaskView?
    state.studentTaskView.participant: {},
  jwt: state.auth.jwt,
});

const mapDispatchToProps = (dispatch) => ({
  editHandle: (handle, id, jwt) => (dispatch(actions.editHandle(handle, id, jwt))),
  updateParticipant: (participant) => (dispatch(actions.updateParticipant(participant)))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeHandle);
