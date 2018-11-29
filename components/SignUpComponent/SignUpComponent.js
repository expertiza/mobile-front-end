import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Table, Row, Rows, Col, Cols } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';


class SignUp extends Component {

    componentDidMount () {


        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        this.props.onSignUpSheetLoad(part_id, true, this.props.jwt);
        console.log("Didmount done");
    }

    componentDidUpdate (prevProps) {

        console.log("Component is updated (Compdidupdate)")
        console.log("PrePropsmsg",prevProps.error_msg)
        console.log("CurrProps", this.props.error_msg)

        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');

        if (this.props.error_msg != prevProps.error_msg){
            this.props.onSignUpSheetLoad(part_id, false, this.props.jwt);
        }
    }


    onSignUp (topic_id){
        console.log(topic_id, this.props.assignment.id);

        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        this.props.onSignUp(part_id, topic_id, this.props.assignment.id, this.props.jwt)
        console.log("Return")
    }

    onDelete (topic_id){

        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        this.props.onDelete(part_id, topic_id, this.props.assignment.id, this.props.jwt)
    }

    static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params ? 'Signup: ' +params.ass_name : 'Signup',
    }
    };

    render() {
        
        table_head = ['Topic #', 'Topic Name', 'No_on_Waitlist', 'Actions', 'Bookmarks', 'Advertisement' ]
        table_data = []
        table_row = []
        widthArr = [65, 150, 120, 120, 120, 120,]

        i = 0
        k = 0 
        
        row_color = []
        table_col = []
        height_arr = []

        height_arr.push(120)
        table_col.push('Topic Name')

        const {navigation} = this.props;
        const ass_name = navigation.getParam('ass_name', 'No-ass-name');
        
        if(this.props.loaded && this.props.assignment.name == ass_name){

            this.props.sign_up_topics.map(sign_up_topic =>(
                    table_row[i++] = sign_up_topic.topic.topic_identifier,
                    table_row[i++] = sign_up_topic.topic.topic_name,
                    table_col.push(sign_up_topic.topic.topic_name),
                    height_arr.push(120),
                    table_row[i++] = sign_up_topic.num_waiting.toString(),

                    table_row[i++] = sign_up_topic.color == ""  ?
                     <Button
                            key = {k++}
                            title={"Sign Up"}
                            titleStyle = {{fontSize: 10, textAlign: 'center', fontWeight: 'bold', margin: 2}}
                            
                            buttonStyle={{
                            backgroundColor: 'red',
                            margin: 15,
                            width: 80,
                            height: 30,
                            borderColor: "transparent",
                            borderWidth: 1,
                            borderRadius: 5
                            
                            }}

                            onPress={ () => {
                                    this.onSignUp(sign_up_topic.topic.id)
                                }
                            }


                        /> : <Button
                            key = {k++}
                            title={"Delete"}
                            titleStyle = {{fontSize: 10, textAlign: 'center', fontWeight: 'bold', margin: 2}}

                            buttonStyle={{
                            backgroundColor: 'red',
                            margin: 15,
                            width: 80,
                            height: 30,
                            borderColor: "transparent",
                            borderWidth: 1,
                            borderRadius: 5
                            
                            }}

                            onPress={ () => {
                                    this.onDelete(sign_up_topic.topic.id)
                                }
                            }
                       />,

                    table_row[i++] = "bookmark",
                    table_row[i++] = "Advertisement",

                    table_data.push(table_row),
                    row_color.push(sign_up_topic.color),
                    table_row = [],
                    i = 0

            )
        )
            return(
            
                <View style={styles.container}>

                    <Text style = {{fontSize:15, fontWeight: 'bold', marginLeft: 2}}> {'\n'}Your Topic(s){'\n'} </Text> 
                    <ScrollView horizontal = {true}>
                    
                        <View >

                             <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    <Row 
                                        data={table_head} 
                                        style={styles.head} 
                                        textStyle={styles.text}
                                        widthArr={widthArr}
                                    />
                            </Table>      
                           
                        
                            <ScrollView style={[styles.dataWrapper, {backgroundColor: 'white'}]}>

                                <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    {
                                      table_data.map((table_row, index) => (

                                        color = row_color[index],
                                        <Row
                                          key={index}
                                          data={table_row}
                                          widthArr={widthArr}
                                          style={ [color == 'yellow' && {backgroundColor: 'yellow'}, color == 'lightgray' && {backgroundColor: 'gray'}] }
                                          textStyle={{margin:6, textAlign: 'center'}}
                                        />
                                      ))
                                    }

                                </Table>                                    

                            </ScrollView>

                        </View>

                    </ScrollView>

                </View>

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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 15},
  head: { height: 40, backgroundColor: 'white' },
  dataWrapper: { marginTop: -1 },
  text: { fontWeight: 'bold', margin: 6, textAlign: 'center' }
});

const mapStateToProps = state => {
    return {
        loaded: state.signUpSheetList.loaded,
        assignment: state.signUpSheetList.signupsheet.assignment,
        sign_up_topics: state.signUpSheetList.signupsheet.sign_up_topics,
        error_msg: state.signUpSheetList.alertMsg,
        jwt: state.auth.jwt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUpSheetLoad: (id, flag, jwt) => { dispatch(actions.onSignUpSheetLoad(id, flag, jwt))},
        onSignUp: (id, topic_id, assignment_id, jwt) => {dispatch(actions.onSignUp(id, topic_id, assignment_id, jwt))},
        onDelete: (id, topic_id, assignment_id, jwt) => {dispatch(actions.onDelete(id, topic_id, assignment_id, jwt))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); 