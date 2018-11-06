import React, {Component} from 'react';
import {Linking} from 'react-native';
import * as actions from '../../redux/index';
import {connect} from 'react-redux';
import {onSubmittedContentLoad} from '../../redux/actions/SubmittedContent';
import SubmittedContentEditView from './SubmittedContentEditView';

class SubmittedContentEditComponent extends Component {

  static navigationOptions = {
    title: 'Submitted content  '
  };

  handle = {
    uploadLink: () => {
      console.log('upload link');
    },
    deleteLink: () => {
      console.log('delete link');
    },
    openLink: (link) => () => {
      Linking.openURL(link);
    },
  }

  render() {
    console.log("submitted.props.links: ",
    this.props.team.submitted_hyperlinks.split('-').map(l=>l.trim()).filter(l=>l!==""));
    return (
      <SubmittedContentEditView assignment={this.props.assignment}
      links={this.props.team.submitted_hyperlinks.split('-').map(l=>l.trim()).filter(l=>l!=="")}
      handle={this.handle} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assignment: state.studentTaskView.assignment,
    participant: state.studentTaskView.participant,
    team: state.studentTaskView.team,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmittedContentLoad: (id, jwt) => dispatch(onSubmittedContentLoad(id, jwt)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmittedContentEditComponent);
