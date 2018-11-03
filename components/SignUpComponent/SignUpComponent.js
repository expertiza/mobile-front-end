import React, {Component} from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Table, Row, Rows } from 'react-native-table-component';
import Spinner from 'react-native-loading-spinner-overlay';


class SignUp extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const part_id = navigation.getParam('par_id', 'NO-ID');        
        this.state={

        }
    }
    
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
        
        table_head = ['Topic #', 'Topic_Name', 'No_of_Slots', 'Available_Slots', 'No_on_Waitlist' ]
        table_data = []
        table_row = []

        if(this.props.loaded)
        {

            {
                this.props.sign_up_topics.map(sign_up_topic =>(
                    table_row.push(sign_up_topic.topic_identifier)
                    table_row.push(sign_up_topic.topic_name)
                    table_row.push(sign_up_topic.topic_max_choosers)
                    table_row.push(sign_up_topic.available_slots)
                    table_row.push(sign_up_topic.num_waiting)

                    table_data.push(table_row)
                    table_row = []

                )
                )
            }

            return 
            (

                <ScrollView>

                <View>

                <Text> Hi I am working fine dude </Text>

                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>

                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                    <Rows data={state.tableData} textStyle={styles.text}/>

                </Table>

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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
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