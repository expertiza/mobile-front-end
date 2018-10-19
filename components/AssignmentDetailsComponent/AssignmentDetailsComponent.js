import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../redux'
import Timeline from 'react-native-timeline-listview';
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

        
    }


    componentDidMount() {

    const {navigation} = this.props;
    const part_id = navigation.getParam('par_id', 'NO-ID');
    
    this.props.onLoad(part_id, this.props.jwt)

  }

    static navigationOptions = {
        title: 'Assignment 1     '
    };
    
    render(){

        let i = true
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

                <View style ={styles.container}>

                <Card

                            containerStyle={{

                                borderWidth: 1, 
                                borderColor: 'gray',
                                marginRight:20,
                                marginLeft:20,
                                marginTop:10,
                                paddingTop:10,
                                paddingBottom:10,
                                paddingRight:1,
                                paddingLeft:10,
                                borderRadius:10,
            
                        }}

                >

                    {
                        
                        list.map((l,i) => (
                        <ListItem 
                                key ={i}
                                containerStyle={{flex:1, padding:1, paddingBottom:5}}
                                title={l.name}
                                titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}
                                subtitle={l.desc}
                                subtitleStyle={{ color: 'red', fontSize:10 }}
                                

                            />
                        ))
                    }

                </Card>
                <Text> {"\n"} </Text>
                    
               
                <Timeline data = {this.data} />

                </View>

                </ScrollView>
                
            )
                
        }

            else{

                return(

                <Spinner
                  visible={true}
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
        get_current_stage: state.studentTaskView.get_current_stage,
        jwt: state.auth.jwt
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
});

const mapDispatchToProps = dispatch => {
        return {
        onLoad: (id, jwt) => { dispatch(actions.onLoad(id, jwt))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetails);


       
    //     , function(something) {
    //   this.setState({ spinner: !this.state.spinner});
    // }.bind(this));

    // this.state={
    //         spinner: true
    //     }



