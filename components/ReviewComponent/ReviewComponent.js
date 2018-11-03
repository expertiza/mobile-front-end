import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../redux'
import Spinner from 'react-native-loading-spinner-overlay';


const mapStateToProps = state => {
    return {
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
        author_response_map: state.responseReducer.author_response_map,
        jwt: state.auth.jwt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReviewData: (review_id,jwt) => {dispatch(actions.fetchReviewData(review_id,jwt))}
    }
}

class Review extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const rid = navigation.getParam('r_id', 'NO-ID');
        const rid_string = JSON.stringify(rid)

        this.props.fetchReviewData(rid, this.props.jwt)
    }

    static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? params.title_name : 'Review',
    }
  };


    author_review_table = () => {

                    let i = 0
                    let index = 0
                    let qno = 0
                    let card_array = []
                    let list_array = []
                    let title_string 
                    let subtitle_string
                    
                    
                    if(this.props.author_questions)
                    {
                        
                            

                            this.props.author_questions.map((question) => {
                                    
                                
                                title_string = index+1 +". "+question.txt
                                subtitle_string = this.props.author_answers[index].answer.toString()                             
                                
                                list_array.push(

                                    <ListItem 
                                        key ={index}
                                        containerStyle={{flex:1}}
                                            
                                        title={title_string}
                                        titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}

                                        subtitle={subtitle_string}
                                        subtitleStyle={{ color: 'red', fontSize:11, fontWeight: 'bold' }}
                                    />

                                ) 
                                

                                    index = index + 1  
                            }
                            )
                       
                        

                        card_array.push(
                            <Card 
                                title = {"Author Review"} 
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
                                    borderRadius:10,                            
                                }}
                            >

                            {list_array}

                            </Card>
                        ); 
                    }
        
        return card_array;
    }

  create_review_table = () => {

                    let i = 0
                    let index = 0
                    let qno = 0
                    let card_array = []
                    let list_array = []
                    let answer_array = []
                    let ans_num_array = []
                    let title_string 
                    let subtitle_string
                    let lefticon
                    
                    {
                        this.props.questions.map((question) => {
                                
                            if(!this.props.answers[index])
                            {
                                title_string = question.txt
                                subtitle_string = ""
                                qno = qno-1
                                list_array.push(                       
                            
                                <ListItem 
                                    key ={index}
                                    containerStyle={{flex:1, padding:1}}
                                        
                                    title={title_string}
                                    titleStyle={{ color: 'black', fontSize:15, textAlign: 'left', fontWeight:'bold'}}

                                    subtitle={subtitle_string}
                                    subtitleStyle={{ color: 'red', fontSize:13, }}
                                />

                            ) 

                            }

                            else if(this.props.answers[index].comments == "") {
                                title_string = qno+1 +". "+question.txt
                                if(this.props.answers[index].answer == null)
                                {
                                    subtitle_string = "No answer"
                                }
                                else if(this.props.answers[index].answer == 1){
                                    subtitle_string = "Yes"
                                }
                                else{
                                    subtitle_string = "No"
                                }
                                list_array.push(                       
                            
                                <ListItem 
                                    key ={index}
                                    containerStyle={{flex:1}}
                                        
                                    title={title_string}
                                    titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}

                                    subtitle={subtitle_string}
                                    subtitleStyle={{ color: 'red', fontSize:11 }}
                                />

                            ) 
                            }

                            else{
                                title_string = qno+1 +". "+question.txt
                                subtitle_string = this.props.answers[index].comments
                                if(this.props.answers[index].answer == null)
                                {
                                    lefticon = ""
                                }
                                else{
                                    lefticon = "(" + this.props.answers[index].answer + ")"
                                }
                                list_array.push(                       
                            
                                <ListItem 
                                    key ={index}
                                    containerStyle={{flex:1}}
                                        
                                    title={title_string}
                                    titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}

                                    subtitle={subtitle_string + lefticon}
                                    subtitleStyle={{ color: 'red', fontSize:11 }}
                                />

                            ) 
                            }

                                index = index + 1  
                                qno = qno + 1
                        }
                        )
                    }

                    list_array.push(

                                <ListItem 
                                    key ={index}
                                    containerStyle={{flex:1}}
                                        
                                    title={"Additional Comments"}
                                    titleStyle={{ color: 'black', fontSize:13, textAlign: 'left', fontWeight:'bold' }}

                                    subtitle={this.props.response.additional_comment}
                                    subtitleStyle={{ color: 'red', fontSize:11 }}
                                />
                    )

                    card_array.push(
                        <Card 
                            title = {"Review"} 
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
                                borderRadius:10,                            
                            }}
                        >

                        {list_array}

                        </Card>
                    ); 
        
        return card_array;
    }


    render(){

        if(!this.props.loading){

            if ( this.props.survey ) {
                // return(
                //     <Text>{this.props.title} for {this.props.survey_parent.name} </Text>
                // )
            }

            else{

                let last_reviewed = (this.props.response.updated_at===null)?'Not Available':(this.props.response.updated_at.split('T'))
                last_reviewed_1 = last_reviewed[0].toString()
                last_reviewed_2 = last_reviewed[1].split('.',1).toString()

                if(this.props.questions.length>0){

                    return(

                        <ScrollView>

                        <View>
                        
                        <Text style = {{textAlign:'center'}}> {'\n'} Last Updated: {last_reviewed_1} - {last_reviewed_2} </Text>

                        {this.create_review_table()}

                        {this.author_review_table()}


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

export default connect(mapStateToProps, mapDispatchToProps)(Review);