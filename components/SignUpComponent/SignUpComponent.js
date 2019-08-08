import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux'
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Table, Row, TableWrapper } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';
// import Orientation from 'react-native-orientation';


class SignUp extends Component {

    componentDidMount () {


        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        this.props.onSignUpSheetLoad(part_id, true, this.props.jwt);
        console.log("Didmount done");
        // Orientation.unlockAllOrientations();
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

    create_alert(row)
    {
        Alert.alert(

          'Topic Details',
          'Id: ' + row[0] + '\nName: ' + row[1] + '\nWaitlist: ' + row[2],
          [
            {text: 'Bookmark', onPress: () => console.log('Bookmark Pressed')},
            {text: 'Adverisement', onPress: () => console.log('Adverisement Pressed')},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
       
    }

    render() {
        
        table_head = ["Topic Name", "Actions"]
        table_data = []
        table_row = []
        widthArr = [150, 150]
        
        i = 0
        k = 0 
        
        row_color = []
        alert_arr = []
        alert_obj = []

        const {navigation} = this.props;
        const ass_name = navigation.getParam('ass_name', 'No-ass-name');
        
        if(this.props.loaded && this.props.assignment.name == ass_name){

            this.props.sign_up_topics.map(sign_up_topic =>(
                    
                    alert_obj[i++] = sign_up_topic.topic.topic_identifier,
                    alert_obj[i++] = sign_up_topic.topic.topic_name,
                    alert_obj[i++] = sign_up_topic.num_waiting.toString(),

                    table_row[i++] = sign_up_topic.topic.topic_name,
                    table_row[i++] = sign_up_topic.color == ""  ?

                     <Button
                            key = {k++}
                            title={"Sign Up"}
                            titleStyle = {{fontSize: 10, textAlign: 'center', fontWeight: 'bold', margin: 2}}
                            
                            buttonStyle={{
                            backgroundColor: 'red',
                            marginLeft: 35,
                            width: 60,
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
                            margin: 35,
                            width: 60,
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

                    table_data.push(table_row),
                    alert_arr.push(alert_obj),
                    row_color.push(sign_up_topic.color),
                    alert_obj = [],
                    table_row = [],
                    i = 0

            )
        )
            return(
            
                <View style={styles.container}>

                    <Text style = {{fontSize:15, fontWeight: 'bold', marginLeft: 2}}> {'\n'}Your Topic(s) </Text> 
                    <Text style = {{fontSize:10, marginLeft: 2}}> Long Press to see details{'\n'} </Text> 
                    <ScrollView horizontal = {true}>
                    
                        <View >

                             <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    <Row 
                                        data={table_head} 
                                        style={{height:35, backgroundColor: 'white'}} 
                                        textStyle={styles.text}
                                        widthArr={widthArr}
                                    />
                            </Table>      
                           
                        
                            <ScrollView style={{marginTop: -1, backgroundColor: 'white'}} >

                                <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                                    {
                                      table_data.map((table_row, index) => (

                                        color = row_color[index],
                                        <Row
                                          key={index}
                                          onLongPress={(e) => this.create_alert(alert_arr[index])}
                                          data={table_row}
                                          textStyle={{margin:6, textAlign: 'center'}}
                                          style={ [{height:40}, color == 'yellow' && {backgroundColor: 'yellow'}, color == 'lightgray' && {backgroundColor: 'gray'}] }
                                          widthArr={widthArr}
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