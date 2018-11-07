import React, {Component} from 'react';
import {Linking} from 'react-native';
import * as actions from '../../redux/index';
import {connect} from 'react-redux';
import SubmittedContentEditView from './SubmittedContentEditView';

class SubmittedContentEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newLink: 'http://',
      linkArray: this.toLinkArray(this.props.team.submitted_hyperlinks),
    }
    this.handle.inputChange = this.handle.inputChange.bind(this);
    this.handle.uploadLink = this.handle.uploadLink.bind(this);
    this.handle.deleteLink = this.handle.deleteLink.bind(this);
  }

  static navigationOptions = {
    title: 'Submitted content  '
  };

  handle = {
    inputChange: (field) => (value) => {
      this.state[field] = value;
      this.setState(this.state);
    },
    uploadLink: () => {
      this.state.linkArray.push(this.state.newLink);
      this.setState(this.state);
      this.props.updateTeam({...this.props.team,
        submitted_hyperlinks: this.toLinkString(this.state.linkArray)
      });
    },
    deleteLink: (index) => () => {
      console.log('delete link');
      this.state.linkArray.splice(index, 1);
      this.setState(this.state);
      this.props.updateTeam({...this.props.team,
        submitted_hyperlinks: this.toLinkString(this.state.linkArray)
      });
    },
    openLink: (link) => () => {
      Linking.openURL(link);
    },
  }

  toLinkArray(links) {
    return links.split('-').map(l=>l.trim()).filter(l=>l!=="");
  }

  toLinkString(linkArray) {
    return '---\r\n-'+linkArray.join('\r\n-');
  }

  render() {
    console.log("hyperlinks",this.props.team.submitted_hyperlinks);
    return (
      <SubmittedContentEditView assignment={this.props.assignment}
      links={this.state.linkArray} newLink={this.state.newLink}
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
    updateTeam: (team) => dispatch(actions.updateTeam(team)),
    onSubmittedContentLoad: (id, jwt) => dispatch(actions.onSubmittedContentLoad(id, jwt)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmittedContentEditComponent);
