import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../../redux'
import Spinner from 'react-native-loading-spinner-overlay';

class ScoresbyQuestion extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }


    static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if(params.rounds < 2 )
            round = 1
        else
            round = params.round
    
    return {
        
      title: params ? "Round: " + round + " of " + params.rounds : 'Your Scores',
    }
  };


    create_scores_by_question = () => {

        let list_array = []
        let card_array = []
        let i, j, k, index
        let subtitle_string 

        i = 0
        index = 0

        const {navigation} = this.props;

        const round = navigation.getParam('round', 'No-data');
        const rounds = navigation.getParam('rounds', 'No-data');
        const list_of_rows = navigation.getParam('list_of_rows', 'No-data');

        list_of_rows.map((lmap) => {


                lmap.score_row.map((score_row) => { 

                    if(score_row.score_value)
                    {
                        subtitle_string = "(" + score_row.score_value + ") - " + score_row.comment
                    }
                    else
                    {
                        subtitle_string = "() - " + score_row.comment
                    }
                    list_array.push(

                            <ListItem 
                                
                                key ={index}
                                containerStyle={{flex:1, padding: 0, margin: 5}}
                                        
                                title={"Review: "+(index+1)}
                                titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}

                                subtitle={subtitle_string}
                                subtitleStyle={{ color: 'red', fontSize:10 }}

                            />
                        )

                    index = index + 1

                })

             card_array.push(


                        <Card 
                                title = {lmap.question_text} 
                                key = {i}
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

                    list_array = []
                    index = 0

            i = i+1
               
        }

        )


        return card_array
    }  

    render(){


        return(
                  
            <ScrollView>

            <View>
                  
                {this.create_scores_by_question()}
                          
            </View>

            </ScrollView>
        )
  
    }
}

export default ScoresbyQuestion;