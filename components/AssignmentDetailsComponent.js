import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-listview';
import {onLoad} from './../redux/actions/StudentTaskView';
import Spinner from 'react-native-loading-spinner-overlay';




class AssignmentDetails extends Component {
    constructor(props) {
        super(props);

        this.data = [
          {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
          {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
          {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
          {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
          {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
        ]

        this.state={
            spinner: false
        }
    }

    componentDidMount(){  
        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        const part_id_string = JSON.stringify(part_id);     
        this.props.onLoad(part_id_string);

        setInterval(() => {
        this.setState({
        spinner: !this.state.spinner
      });
    }, 3000);

    }

    static navigationOptions = {
        title: 'Assignment 1'
    };
    
    render(){

        if(this.props.loaded){
        const {navigation} = this.props
        const part_id = navigation.getParam('par_id', 'NO-ID')
        const part_id_string = JSON.stringify(part_id)

        const list = [
                    
                    {
                        name: "Signup sheet",
                        desc: "Sign up for a topic"
                    },
                    {
                        name: "Your work",
                        desc: "You have to choose a topic first"
                    },
                    {
                        name: "Others Work",
                        desc: "Give feedback to others on their work"
                    },
                    {
                        name: "Change handle",
                        desc: "Provide a different handle for this assignment"
                    },
                ]


        
        
            return(

                <ScrollView>

                <View>

                

                <Text> ID : {part_id_string} </Text>
                    {
                        
                        list.map((l,i) => (
                        <ListItem 
                                key ={i}
                                containerStyle={{flex:1}}
                                title={l.name}
                                titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}
                                subtitle={l.desc}
                                subtitleStyle={{ color: 'red', fontSize:10 }}
                                

                            />
                        ))
                    }
                    
                <Timeline data = {this.props.timeline_list} />

                </View>

                </ScrollView>
            )

        }

            else{

                return(

                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                />

                )
            }
        }
            
    }

const mapStateToProps = state => {
    return {
        
        participant: state.studentTaskView.participant,
        can_submit : state.studentTaskView.can_submit,
        can_review: state.studentTaskView.can_review,
        can_take_quiz: state.studentTaskView.can_take_quiz,
        authorization: state.studentTaskView.authorization,
        team : state.studentTaskView.team,
        denied: state.studentTaskView.denied,
        assignment: state.studentTaskView.assignment,
        can_provide_suggestions: state.studentTaskView.can_provide_suggestions,
        topic_id: state.studentTaskView.topic_id,
        topics: state.studentTaskView.topics,
        timeline_list: state.studentTaskView.timeline_list,
        loaded: state.studentTaskView.loaded,
        submission_allowed: state.studentTaskView.submission_allowed,
        check_reviewable_topics: state.studentTaskView.check_reviewable_topics,
        metareview_allowed: state.studentTaskView.metareview_allowed,
        get_current_stage: state.studentTaskView.get_current_stage
    }
}

const mapDispatchToProps = dispatch => ({
        onLoad: (id) => dispatch(onLoad(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetails);

