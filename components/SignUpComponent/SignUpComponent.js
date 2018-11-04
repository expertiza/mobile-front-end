import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';


class SignUp extends Component {

    
    componentDidMount () {


        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');
        this.props.onSignUpSheetLoad(part_id, true, this.props.jwt);
        console.log(this.props.loaded);
    }

    componentDidUpdate (prevProps) {

        console.log("PrePropsmsg",prevProps.error_msg)
        console.log("CurrProps", this.props.error_msg)

        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');

        if (this.props.error_msg != prevProps.error_msg){
            this.props.onSignUpSheetLoad(part_id, false);
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
        
        table_head = ['Topic #', 'Topic_Name', 'No_of_Slots', 'Available_Slots', 'No_on_Waitlist', 'Bookmarks', 'Actions', 'Advertisement' ]
        table_data = []
        table_row = []
        widthArr = [65, 150, 100, 120, 120, 120, 120, 120,]
        i = 0
        row_color = []
        
        const {navigation} = this.props;
        const ass_name = navigation.getParam('ass_name', 'No-ass-name');
        
        if(this.props.loaded && this.props.assignment.name == ass_name){

            this.props.sign_up_topics.map(sign_up_topic =>(
                    table_row[i++] = sign_up_topic.topic.topic_identifier,
                    table_row[i++] = sign_up_topic.topic.topic_name,
                    table_row[i++] = sign_up_topic.topic.max_choosers.toString(),
                    table_row[i++] = sign_up_topic.available_slots.toString(),
                    table_row[i++] = sign_up_topic.num_waiting.toString(),
                    table_row[i++] = sign_up_topic.topic.max_choosers.toString(),
                    table_row[i++] = sign_up_topic.available_slots.toString(),
                    table_row[i++] = sign_up_topic.num_waiting.toString(),

                    table_data.push(table_row),
                    row_color.push(sign_up_topic.color),
                    table_row = [],
                    i = 0

            )
        )
            return(
            
                <View style={styles.container}>


                    <ScrollView horizontal = {true}>
                    
                        <View>

                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                    <Row 
                                        data={table_head} 
                                        style={styles.head} 
                                        textStyle={styles.text}
                                        widthArr={widthArr}
                                    />
                            </Table>          
                        
                            <ScrollView style={styles.dataWrapper}>

                                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                    {
                                      table_data.map((table_row, index) => (

                                        color = row_color[index],
                                        <Row
                                          key={index}
                                          data={table_row}
                                          widthArr={widthArr}
                                          style={ color == 'yellow' && {backgroundColor: 'yellow'}}
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
  container: { flex: 1, padding: 16, paddingTop: 15, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
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



// <Rows 
//                                         data={table_data} 
//                                         textStyle={{margin: 6}}
//                                         widthArr={widthArr}
//                                     />