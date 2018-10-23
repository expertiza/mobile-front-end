import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {editHandle} from '../../redux/actions/ParticipantHandle';
import {updateParticipant} from '../../redux/actions/StudentTaskView';
import ChangeHandleView from './ChangeHandleView';

class ChangeHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_handle: ""
    }
    this.handleNameChangeHandler = this.handleNameChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  static navigationOptions = {
    title: 'Change handle   '
  };
  componentDidMount = () => {
    // console.log('ChangeHandle.props.participant: ', this.props.participant);
    this.setState({
      participant_handle: this.props.participant.handle
    });
  }
  handleNameChangeHandler = (value) => {
    // console.log('handle change: ', value);
    this.setState({
      participant_handle: value
    });
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
      handleNameChangeHandler={this.handleNameChangeHandler}
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
  editHandle: (handle, id, jwt) => (dispatch(editHandle(handle, id, jwt))),
  updateParticipant: (participant) => (dispatch(updateParticipant(participant)))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeHandle);
