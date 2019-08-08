import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../redux'
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchScore } from '../../redux/actions/Grade';


const mapStateToProps = state => {
     if(state.studentTaskView.assignment===null || state.studentTaskView.assignment===undefined){
        return{
            assignment: "",
            jwt: state.auth.jwt
        }
    }
    else{    
        return{
            assignment : state.studentTaskView.assignment.name,
            team: state.studentTaskView.team,
            questionnaires: state.grades.questionnaires,
            vm: state.grades.vm,
            total: state.grades.total,
            team_name: state.grades.team_name,
            jwt: state.auth.jwt
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchScore: (id, jwt) => dispatch(fetchScore(id,jwt))
    }
}

class YourScores extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        const part_id_string = JSON.stringify(part_id)
        
        this.props.fetchScore(part_id, this.props.jwt );
    }

    static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? 'Scores of ' +params.ass_name : 'Your Scores',
    }
  };


    create_scores_by_reviewer = () => {

        let list_array = []
        let card_array = []
        let i, j, k, index

        i = 0
        j = 1
        k = 2

        if((this.props.vm !== null && this.props.vm!== undefined && this.props.vm.length>0))
        {
    
            {
                this.props.vm.filter((q) => (q.questionnaire_type==='ReviewQuestionnaire' && q.list_of_reviewers.length>0))

                .map((rq) => {

                    round = 1
                    list_array = []

                    if(rq.round)
                    {
                        round = rq.round
                    }
        
                    card_array.push(

                         <Text 
                            key = {i} 
                            style = {{ fontWeight:'bold'}}
                        > 

                            {"\n"} Review (Round: {round} of {rq.rounds}){"\n"} 

                        </Text>
                    )

                
                    rq.list_of_reviews.map((reviewlist, ind) => {

                        list_array.push(

                            <ListItem 
                                
                                key ={ind}
                                containerStyle={{flex:1}}
                                        
                                title={"Review " + ((ind+1).toString())}
                                titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}

                                onPress={ (e) => {
                                    
                                    this.props.navigation.navigate('Review', {
                                    r_id: reviewlist.id,
                                    title_name: "Review " + ((ind+1).toString()),

                                    }); 

                                }}
                            
                            />
                        )

                                                        
                    }

                    )


                    card_array.push(


                        <Card 
                                title = {"Author Review"} 
                                key = {j}
                                containerStyle={{

                                    borderWidth: 1, 
                                    borderColor: 'gray',
                                    marginRight:20,
                                    marginLeft:20,
                                    marginTop:10,
                                    marginBottom:10,
                                    paddingTop:10,
                                    paddingBottom:10,
                                    paddingRight:1,
                                    borderRadius:10,                            
                                }}
                            >

                            {list_array}

                        </Card>

                    )

                    card_array.push(

                        <Button
                            key = {k}
                            title={"View by Questions"}
                            titleStyle = {{fontSize: 10}}
                            align =  'center'

                            buttonStyle={{
                            backgroundColor: 'red',
                            marginLeft: 20,
                            width: 200,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10
                          }}

                            onPress={ () => {

                                if(this.props.team.name == this.props.team_name)
                                {
                                    this.props.navigation.navigate('ScoresbyQuestion', {
                                    round: rq.round,
                                    rounds: rq.rounds,
                                    list_of_rows: rq.list_of_rows,
                                        
                                });
                                }

                                else
                                {
                                    return(

                                        <Spinner
                                            visible={true}
                                            textContent={'Loading...'}
                                        />
                                    )
                                } 

                            }
                            }

                        />
                    )

                    i = i+3
                    j = j+3
                    k = k+3

                }

                )

            }

        }

        return card_array
    }  

    render(){

        const {navigation} = this.props;
        const assignment_name = navigation.getParam('ass_name', 'no-name');


        if(this.props.team.name == this.props.team_name)
        {
            return(
                  
            <ScrollView>

            <View>
                  
            <Text style = {{textAlign:'center'}}> {"\n"}Team: {this.props.team_name} </Text>

            <Text style = {{textAlign:'center'}}> Average peer review score: {(this.props.total !== null && this.props.total !== undefined && this.props.total % 1 !== 0)? this.props.total.toFixed(2): this.props.total} </Text>

            {this.create_scores_by_reviewer()}
                          
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

export default connect(mapStateToProps, mapDispatchToProps)(YourScores);