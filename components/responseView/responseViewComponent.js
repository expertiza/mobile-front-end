import React, {Component} from 'react';
import { Text, ScrollView, View, Picker, Linking } from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/index';
import ResponseView from './responseView';

class  ResponseViewComponent extends Component {
  constructor(props){
      super(props)
      this.state = {
          author_feedback: false,
          toggle_button: 'unhide',
      }
      for (func in this.handle) {
        this.handle[func] = this.handle[func].bind(this);
      }
  }
  componentDidMount () {
      this.props.fetchReviewData(78704, this.props.jwt)
      .then(() => {
        // console.log("set state");
        this.setState({
          ...this.state,
          response: {...this.props.response,
            linkArray: this.toLinkArray(this.props.response.contributor.submitted_hyperlinks),
            questions: this.mergeAns2Question(this.props.response.answers, this.props.response.questions),
          }
        });
      });
  }

  handle = {
    inputChange: (field) => (value) => {
      this.state[field] = value;
      this.setState(this.state);
    },
    openLink: (link) => () => {
      Linking.openURL(link.link);
    },
  }

  toLinkArray(links) {
    return links.split('-').map(l=>l.trim()).filter(l=>l!=="")
      .map(s=>({link: s, check: false}));
  }

  mergeAns2Question(ans, q) {
    for (let i = 0; i < q.length; i++) {
      if (ans[i].comments.length > 6) {
        ans[i].comments = ans[i].comments.substring(3, ans[i].comments.length - 4);
      }
      if (!ans[i].answer) {
        ans[i].answer = '-';
      }
      q[i].ans = ans[i];
    }
    return q;
  }

  render () {
    console.log("RVC state: ", this.state);
    if (!this.state.response) {
      return (<ScrollView></ScrollView>);
    } else return (
      <ResponseView response={this.state.response} handle={this.handle}/>
    )
  }

}


const mapStatetoProps = state => {
    return {
        jwt: state.auth.jwt,
        response: {
          title: state.responseReducer.title,
          assignment: state.responseReducer.assignment,
          loading: state.responseReducer.loading,
          response: state.responseReducer.response,
          questions: state.responseReducer.questions,
          answers: state.responseReducer.ans,
          team: state.studentTaskView.team,
          contributor: state.responseReducer.contributor,
          author_questions: state.responseReducer.author_questions,
          author_answers: state.responseReducer.author_answers,
          author_response_map: state.responseReducer.author_response_map
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReviewData : (review_id, jwt) => dispatch(actions.fetchReviewData(review_id, jwt))
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ResponseViewComponent);
