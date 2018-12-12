import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import {fetchStudentTasks} from '../../redux/actions/StudentTaskList';
import {fetchStudentsTeamedWith} from '../../redux/actions/StudentTaskList';

const mapStateToProps = state => {
    return {
        studentTasks: state.studentTaskList.studentTasks,
        studentsTeamedWith: state.studentTaskList.studentsTeamedWith,
        jwt: state.auth.jwt
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStudentTasks: (jwt) => dispatch(fetchStudentTasks(jwt)),
    fetchStudentsTeamedWith: (jwt) => dispatch(fetchStudentsTeamedWith(jwt))
})

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.fetchStudentTasks(this.props.jwt);
        this.props.fetchStudentsTeamedWith(this.props.jwt);
    }
    create_cards = () => {
        
        let flags = []
        let i
        let count = 0
        let card_array = []
        let list_array = []
        {
            this.props.studentTasks.map((studentTask1) => {
                if(flags.indexOf(studentTask1.course_name) < 0){
                    flags.push(studentTask1.course_name);
                    count++;
                }
            });
        } 
        for(i=0; i < flags.length; i++)
        {
            let f
            f = flags[i];    
            {this.props.studentTasks.map((studentTask2) => {
                    let deadline = studentTask2.stage_deadline.split(".",1).toString();
                    var q = new Date();
                    var m = q.getMonth();
                    var d = q.getDay();
                    var y = q.getFullYear();
                    var date = new Date(y,m,d);
                    deadline = deadline.split("T",1).toString();
                    mydate=new Date(deadline);
                    if(date>mydate){
                        deadline = "Finished";
                    }
                    if(studentTask2.course_name == f){
                           list_array.push(                       
                            <ListItem 
                                key ={studentTask2.assignment.id}
                                containerStyle={{flex:1}}
                                title={studentTask2.assignment.name}
                                titleStyle={{ color: 'black', fontSize:13, textAlign: 'left' }}
                                subtitle={deadline}
                                subtitleStyle={{ color: 'red', fontSize:10 }}
                                onPress={ () => {
                                    this.props.navigation.navigate('Details', {
                                        par_id: studentTask2.participant.id,
                                        ass_name: studentTask2.assignment.name,
                                    }); 
                                }}

                            />)
                    }    
                })}
            card_array.push(
                <Card 
                    title = {f} 
                    key = {i}
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
                }}>{list_array}
                 </Card>);
        }    
        return card_array;
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return{
            title: 'Assignments',
            headerLeft: <Icon name='menu' size={24}
            iconStyle={{ color: 'white' }}
            onPress={ () => navigation.toggleDrawer() } />
        }
    };
    render(){
        return( 
            <ScrollView>
                <View style = {styles.container}>
                        {this.create_cards()}
                </View>
            </ScrollView> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});

export default connect(mapStateToProps, mapDispatchToProps) (Assignment);


