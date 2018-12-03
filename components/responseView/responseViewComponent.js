import React, {Component} from 'react';
import { ScrollView, Alert } from 'react-native';
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
            additional_comment: this.getInnerText(this.props.response.response.additional_comment),
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
    editComment: (idx) => (value) => {
      this.state.response.questions[idx].ans.comments = value;
      // TODO: update database
      this.setState(this.state);
    },
    editScore: (idx) => (i, value) => {
      this.state.response.questions[idx].ans.answer = Number(value);
      this.state.response.questions[idx].ans.color =
        this.handle.calcColor(this.state.response.questions[idx].ans.answer);
      // TODO: update database
      this.setState(this.state);
    },
    calcColor: (score) => {
      switch(score) {
        case 2: return '#FD992D';
        case 3: return '#FFEC8B';
        case 4: return '#BCED91';
        case 5: return '#2DE636';
        default:
          return '#FF8080';
      }
    },
  }

  // setScore(idx, value) {
  //   return () => {
  //     this.state.response.questions[idx].ans.answer = value;
  //     this.setScoreColor(this.state.response.questions[idx].ans);
  //     // TODO: update database
  //     this.setState(this.state);
  //   }
  // }

  toLinkArray(links) {
    return links.split('-').map(l=>l.trim()).filter(l=>l!=="")
      .map(s=>({link: s, check: false}));
  }

  getInnerText(s) {
      if (s.length > 6) {
         return s.substring(3, s.length - 4);
      }
      return "";
  }

  mergeAns2Question(ans, q) {
    for (let i = 0; i < q.length; i++) {
      ans[i].comments = this.getInnerText(ans[i].comments);
      ans[i].color = this.handle.calcColor(ans[i].answer);
      q[i].ans = ans[i];
    }
    return q;
  }


  render () {
    // console.log("RVC state: ", this.state);
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
