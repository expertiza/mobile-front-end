import React, {Component} from 'react';
import {Alert} from 'react-native';
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
    for (func in this.handle) {
      this.handle[func] = this.handle[func].bind(this);
    }
    // this.handle.inputChange = this.handle.inputChange.bind(this);
    // this.handle.uploadLink = this.handle.uploadLink.bind(this);
    // this.handle.deleteLinks = this.handle.deleteLinks.bind(this);
    // this.handle.checkLink = this.handle.checkLink.bind(this);
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
      this.state.linkArray.push({link: this.state.newLink, check: false});
      this.setState(this.state);
      this.props.updateTeam({...this.props.team,
        submitted_hyperlinks: this.toLinkString(this.state.linkArray)
      });
    },
    deleteLinks: () => {
      this.state.linkArray = this.state.linkArray.filter(l=>!l.check);
      this.setState(this.state);
      this.props.updateTeam({...this.props.team,
        submitted_hyperlinks: this.toLinkString(this.state.linkArray)
      });
    },
    checkLink: (link) => () => {
      link.check = !link.check;
      this.setState(this.state);
    },
    openLink: (link) => () => {
      Linking.openURL(link.link);
    },
    alertDelete: () => {
      links = this.state.linkArray.filter(l=>l.check);
      if (0 === links.length) return;
      Alert.alert("Warning!",
        "The following links will be deleted:\r\n"+
          links.map(l=>l.link).join("\r\n"),
        [
          {text: 'Ok', onPress: this.handle.deleteLinks},
          {text: 'Cancel', onPress: () => {}},
        ],
      );
    }
  }

  toLinkArray(links) {
    return links.split('-').map(l=>l.trim()).filter(l=>l!=="")
      .map(s=>({link: s, check: false}));
  }

  toLinkString(linkArray) {
    return '---\r\n- '+linkArray.map(o=>o.link).join('\r\n-');
  }

  render() {
    //console.log("hyperlinks",this.props.team.submitted_hyperlinks);
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
