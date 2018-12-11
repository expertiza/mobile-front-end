import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../redux'
import Timeline from 'react-native-timeline-listview';
import Spinner from 'react-native-loading-spinner-overlay';




class AssignmentDetails extends Component {
    
    options_available = []
    temp_object = {}

    f = true
    time_array = []
    options_list = []

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

  getAliasName = () => {
        let alias_name;
        if (this.props.authorization !== 'reader') {
            alias_name = "Others' work"
        }else {
            alias_name = "Your readings"
        }
        return alias_name
    }

    filltemp = (name,desc,handler) => {
        this.temp_object["name"] = name
        this.temp_object["desc"] = desc
        this.temp_object["handler"] = handler
        this.options_available.push(this.temp_object)
        this.temp_object = {} 
    }

    get_options_list = () => {

        let i = 0
        
        list_array = []
        card_array = []
        

        // Sign up option

            this.props.topics.length > 0 ? this.props.authorization === 'participant' || this.props.authorization === 'submitter' ? 
            this.filltemp("Sign up sheet","Sign up for a topic", () => {this.props.navigation.navigate('Signup', {
                                        par_id: this.props.participant.id,
                                        ass_name: this.props.assignment.name,})}
                        ) : null : null

        // View and manage your team

            if(this.props.assignment.max_team_size > 1)
            {
                if(this.props.authorization === 'participant')
                {
                    // Add your Screen name here
                    this.filltemp("Your team","View and Manage your team", ()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                }
                                )
                }
            }

            

        // Your work

            if(this.props.authorization === 'participant' || this.props.can_submit === true)
            {
                if(this.props.topics.size > 0)
                {
                    if(this.props.topic_id && !this.props.submission_allowed)
                    {
                        // Add your Screen name here
                        this.filltemp("Your work","Submit and view your work", ()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })
                    }
                    else{
                        this.filltemp("Your work","You have to choose a topic first", () => {})
                    }
                }
                else{

                    if(!this.props.submission_allowed)
                    {
                        this.filltemp("Your work","Submit and view your work", () => {})                        
                    }
                    else{
                        this.filltemp("Your work","You are not allowed to submit your work right now", () => {})
                    }

                }
            }

            // <!--alias_name means if one participant is a reader, it will show 'Your readings' to see others' work; if one participant is not a reader, it will show 'Others' work' on the screen.-->

            if(this.props.authorization === 'participant' || this.props.can_review)
            {
                if(this.props.check_reviewable_topics || this.props.metareview_allowed || this.props.get_current_stage === "Finished")
                {
                    // Add your Screen name here
                    this.filltemp(this.getAliasName(),"(Give feedback to others on their work)",()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })   
                }
                else
                {
                    this.filltemp(this.getAliasName(),"(Give feedback to others on their work)",() => {}) 
                }
            }

            // Quiz

            if(this.props.assignment.require_quiz)
            {
                if(this.props.authorization === 'participant' || this.props.can_take_quiz)
                {
                    // Add your Screen name here
                    this.filltemp("Take quizzes","(Take quizzes over the work you have read)",()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })      
                }
                else
                {
                    this.filltemp("Take quizzes","(Take quizzes over the work you have read)",()=>{}) 
                }
            }

            //  Only if the assignment supports self-review and students submitted self-review can he or she view scores

            if(this.props.team && (this.props.authorization === 'participant' || this.props.can_submit))
            {
                if(this.props.assignment.is_selfreview_enabled && this.props.unsubmitted_self_review)
                {
                    this.filltemp("Your scores","(You have to submit self-review under 'Your work' before checking 'Your scores')",()=>{})  
                    
                }
                else
                {
                    this.filltemp("Your scores","(View feedback on your work)",()=>{
                                  this.props.navigation.navigate('Scores', {
                                        par_id: this.props.participant.id,
                                        ass_name: this.props.assignment.name,
                                        
                                        });
                                })     
                }
            }

            if(this.props.can_provide_suggestions)
            {
                // Add your Screen name here   
                this.filltemp("Suggest a Topic","",()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })    
 
            }

            if(this.props.get_current_stage === "Complete")
            {
                // Add your Screen name here
                this.filltemp("Take a Survey","",()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })    
     
            }

            // Add your Screen name here
            this.filltemp("Change your handle","",()=>{
                                  this.props.navigation.navigate('Screen name', {});
                                })    

           
        // List items that has the options related to the assignment

            let par_id
            let ass_name

            this.options_available.map((l,i) => (    
                list_array.push(
                    <ListItem 
                        key ={i}
                        containerStyle={{flex:1, padding:1, paddingBottom:5}}
                        title={l.name}
                        titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}
                        subtitle={l.desc}
                        subtitleStyle={{ color: 'red', fontSize:10 }}
                        onPress={l.handler}

                    />
                )
                )
            )
                            
                        card_array.push(

                            <Card
                                title = {"List of Options"} 
                                key = {i++}
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

                            >   {list_array}

                            </Card>
                        )

            this.options_available = []

         return card_array
    }


    get_timeline = () => {

        let timeline_print = []
        let timeline_array = []
        let data = {}
        let i = 0
        let time
        let temp_id
        let style_flag 

        {

            this.props.timeline_list.map((timelineitem) => {

                

                

                if(timelineitem.id)
                {
                    data["desc"] = 'Id:' + timelineitem.id

                    data["description"] = timelineitem.label

                    time =  timelineitem.updated_at.split("," , 2)

                    data["time"] = time[1].toString();

                    data["title"] = "Peer review"
                }

                else if(timelineitem.link){
                    data["desc"] = 'Link:' + timelineitem.link

                    data["description"] = timelineitem.label

                    time =  timelineitem.updated_at.split("," , 2)

                    data["time"] = time[1].toString();

                    data["title"] = "Peer review"
                }

                else
                {
                    data["desc"] = 'Id not available' 

                    data["description"] = ""

                    time =  timelineitem.updated_at.split("," , 2)

                    data["time"] = time[1].toString();

                    data["title"] = timelineitem.label  
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

                                    temp_id = e.desc.split(":")
                            
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
                  titleStyle={{color:'black', padding:0,fontSize:12}}
                  descriptionStyle={{color:'red', padding:0,fontSize:12}}
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

        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');

        if(this.props.loaded && this.props.participant.id == part_id ){


                return(

                    <ScrollView>

                    <View style ={styles.container}>

                    
                    {this.get_options_list()}
                        

                    {this.get_timeline()}

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