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
        this.state = {

        }
    }


    componentDidMount() {

    const {navigation} = this.props;
    const part_id = navigation.getParam('par_id', 'NO-ID');
    const part_id_string = JSON.stringify(part_id)

   this.props.onLoad(part_id, this.props.jwt)

  }

  author_review_table = () => {

    options_available = []
    temp_object = {}



    return options_available
  }

    get_timeline = () => {

        let timeline_print = []
        let timeline_array = []
        let data = {}
        let i = 0
        let time
        let temp_id

        {

            this.props.timeline_list.map((timelineitem) => {

                data["title"] = timelineitem.label

                time =  timelineitem.updated_at.split("," , 2)

                data["time"] = time[1].toString();

                if(timelineitem.id)
                {
                    data["description"] = 'Id:' + timelineitem.id
                }

                else if(timelineitem.link){
                    data["description"] = 'Link:' + timelineitem.link
                }

                else
                {
                    data["description"] = 'Id not available'
                }
                timeline_array.push(data)

                data = {}

            }

            );

        }

        timeline_print.push(

                <Timeline
                  style={{flex:1, margin:10}}
                  key = {i++}
                  data={timeline_array}
                  separator = 'true'
                  circleSize={20}
                  circleColor='black'
                  lineColor='red'
                  lineWidth={1}
                  timeContainerStyle={{minWidth:25, marginTop: -5}}
                  detailContainerStyle={{minWidth:35, marginTop: -5}}

                  onEventPress = { (e) => {

                                    temp_id = e.description.split(":")

                                    if( temp_id[0] == "Id"){
                                        console.log(e.title)
                                        console.log(temp_id[1])
                                        this.props.navigation.navigate('Review', {
                                        r_id: Number(temp_id[1]),
                                        title_name: e.title,
                                        });
                                    }

                                    else{
                                        console.log('No id available')
                                    }

                                }}

                  timeStyle={{textAlign: 'center', color:'red', padding:5, fontSize:9}}
                  titleStyle={{color:'black', padding:5,fontSize:12}}
                  descriptionStyle={{color:'gray'}}
                  options={{
                    style:{paddingTop:5}
                  }}
                  innerCircle={'dot'}

                />

            );

        return timeline_print;
    }

    static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.ass_name : 'Assignment Info',
    }
  };

    render(){


        if(this.props.loaded){


            let temp_print = []
            temp_print = this.get_timeline()

            const list = [

                            {
                                name: "Signup sheet",
                                desc: "Sign up for a topic"
                            },
                            {
                                name: "Your team",
                                desc: "You have to choose a topic first",
                                handler: ()=>{
                                  this.props.navigation.navigate('StudentTeamComponent', {});
                                }
                            },
                            {
                                name: "Your work",
                                desc: "You have to choose a topic first",
                                handler: ()=>{
                                  this.props.navigation.navigate('SubmittedContentEditComponent', {});
                                }
                            },
                            {
                                name: "Others Work",
                                desc: "Give feedback to others on their work"
                            },
                            {
                                name: "Change handle",
                                desc: "Provide a different handle for this assignment",
                                handler: ()=>{
                                  this.props.navigation.navigate('ChangeHandle', {});
                                }
                            },
                        ]

// Implement a spinner so that it loads until the new timeine is printed

            if(temp_print)
            {
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
                                    onPress={l.handler}


                                />
                            ))
                        }

                    </Card>



                    {temp_print}

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
