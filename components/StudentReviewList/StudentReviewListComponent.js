import React, { Component } from 'react';
import {fetchAssignmentReviewData} from '../../redux/actions/StudentReview'
// import {reviewNewTopic} from '../../redux/actions/StudentReview'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import { connect } from 'react-redux';


class StudentReviewListComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            viewtopic :true,
            selected_topic: {}
        }
        this.toggletopic = this.toggletopic.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.newReview = this.newReview.bind(this)
    }

    newReview = (assignment_id, profile_id, topic_id) => {
        reviewNewTopic(assignment_id, profile_id, topic_id, this.props.jwt).
        then(()=> this.props.loadReviewData(this.props.match.params.id, this.props.jwt))
    }

    componentDidMount = () =>{
        const {navigation} = this.props;
        const par_id = navigation.getParam('par_id', 'NO-ID');
        this.props.loadReviewData(par_id, this.props.jwt)
    }

    toggletopic = () => {
        this.setState({
            viewtopic: !this.state.viewtopic
        }) 
    }
    handleChange = (e) => {
        this.setState({
            selected_topic: e.target.value
        });
    }
    render () {
        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        if(this.props.non_reviewable_topics){
            return (
                <View>
                    <Text>LULZ Hello review options for id:{part_id}</Text>
                </View>
            )
        }
        else{
            return(
                <Spinner visible={true} textContent={' Loading...      '}/>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        loadReviewData: (id,jwt) => dispatch(fetchAssignmentReviewData(id,jwt)),
        //  reviewNewTopic: (assignment_id, user_id, topic_id) => dispatch(reviewNewTopic(assignment_id, user_id, topic_id))
    }
}
const mapStateToProps = state => {
    return {
        jwt: state.auth.jwt,
        candidate_reviews_started: state.assignmentReviewData.candidate_reviews_started,
        non_reviewable_topics: state.assignmentReviewData.non_reviewable_topics,
        candidate_topics_to_review: state.assignmentReviewData.candidate_topics_to_review,
        assignment: state.studentTaskView.assignment,
        profile_id: state.profile.profile.id
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentReviewListComponent);