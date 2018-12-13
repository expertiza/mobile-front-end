import React, { Component } from 'react';
import {fetchAssignmentReviewData} from '../../redux/actions/StudentReview'
// import {reviewNewTopic} from '../../redux/actions/StudentReview'
import { ScrollView, Text, View, StyleSheet, Alert, Vibration, Switch } from 'react-native'
import { CheckBox, ListItem, Button, Icon } from 'react-native-elements'

import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment'
import { connect } from 'react-redux'


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
                <ScrollView style={styles.container}>
                    <View style={{flex: 1}}>
                        <Text style= {styles.titleText}>Reviews for "{this.props.assignment.name}"</Text>
                        <Text h5>Number of reviews allowed:{this.props.assignment.num_reviews_allowed}</Text>
                        <Text h5>You are required to do {this.props.assignment.num_reviews_required} reviews{"\n"}</Text>
                        {(this.props.candidate_reviews_started.length>0)?
                        //  <Table className="table_topic_list">
                        <View>
                            {this.props.candidate_reviews_started.map((i, index) => 
                                <View key={"review"+index}>
                                        <Text onPress = {()=>{
                                            Vibration.vibrate(100);
                                            
                                                Alert.alert(
                                                    'Developer Alert',
                                                    'navigate to the review form',
                                                    [
                                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                                    ],
                                                    { cancelable: false }
                                                )}
                                            } style={styles.linkText}>
                                          {/* this.props.navigation.navigate('Screen name', {})}}style={styles.boldText}> */}
                                             {i.id +":"+ i.name}
                                        </Text>
                                        {/* <NavLink to={`/response/view/${i.latest_response_id}`}> View </NavLink> */}
                                        {/* add navlink to the edit form  */}
                                        {/* <NavLink to={``}> edit </NavLink> */}
                                        <Text style={{fontStyle:'italic'}}>
                                            {"  -- last update  " +moment(new Date(i.map.updated_at)).format('MMMM Do YYYY, hh:mm')+"\n"}
                                        </Text>
                                </View>
                            )}
                        </View>
                        : <View></View>
                        }
                    </View>
                    <View>
                        <CheckBox
                            title="I don't care which topic I review"  
                            checked={this.state.viewtopic} 
                            onPress={this.toggletopic}
                            containerStyle={{backgroundColor: "transparent" }}
                            />
                        <Text style={{fontWeight: "bold"}}> Select a topic below to begin a new review:</Text>
                        {(this.state.viewtopic)?
                            <View>
                                { this.props.candidate_topics_to_review.map((e, index)=>
                                        <View key={"topic_reviewable+"+index}>
                                            {/* <Input type="radio" name="selected_topic" value={e.id} onChange={this.handleChange}/> */}
                                                <Text>
                                                    {e.topic_identifier + ":" + e.topic_name+"\n"}
                                                </Text>
                                        </View>
                                )}
                                {
                                    this.props.non_reviewable_topics.map((e, index)=>
                                    <View key={"topic_non_"+index}>
                                        <Text style={{color:"gray"}}>
                                            {e.topic_identifier + ":" + e.topic_name + "\n"} 
                                        </Text>
                                    </View>
                                )}
                            </View>:<View></View> 
                        }
                    </View>
                    <Button onPress={()=> 
                             this.newReview(this.props.assignment.id,this.props.profile_id,this.state.selected_topic)}
                        title="Request a new submission to review">
                    </Button>
                </ScrollView>
            )
        }
        else{
            return(
                <Spinner visible={true} textContent={' Loading...      '}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
      },
    linkText: {
        fontWeight: 'bold',
        color: "#986633"
    }
})

const mapDispatchToProps = dispatch => {
    
    return {
        loadReviewData: (id,jwt) => dispatch(fetchAssignmentReviewData(id,jwt)),
        reviewNewTopic: (assignment_id, user_id, topic_id) => dispatch(reviewNewTopic(assignment_id, user_id, topic_id))
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