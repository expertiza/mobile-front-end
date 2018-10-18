import React, { Component } from 'react';
import {View, Text, Button } from 'react-native';
import StudentTeamView from './studentTeamComponent/StudentTeamComponentView';

const mock = {
  teamName: "OSS project/Writing assignment 2_Team20",
  members: [
    {
      id: 6362,
      name: 'student6362',
      actions: []
    }, {
      id: 6433,
      name: 'student6433',
      actions: [
        {
          id: 0,
          name: 'View',
          handler: () => {}
        }, {
          id: 1,
          name: 'Edit',
          handler: () => {}
        }
      ]
    }, {
      id: 6420,
      name: 'student6420',
      actions: [
        {
          id: 0,
          name: 'View',
          handler: () => {}
        }, {
          id: 1,
          name: 'Edit',
          handler: () => {}
        }
      ]
    },
  ],
  invitations: [
    {id: 6433, name: 'student6433', status: 'accept'},
    {id: 6420, name: 'student6420', status: 'accept'},
  ],
}

const style = {
  buttonView: {
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10,
  }
}

class Assignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 'assignment'
        }
    }
    static navigationOptions = {
        title: 'Assignments       '
    };
    render(){
      if (this.state.page === 'studentTeam') {
        return(
          <View>
            <StudentTeamView teamName={mock.teamName}
            members={mock.members} invitations={mock.invitations} />
            <View style={style.buttonView}>
              <Button title='< Back' onPress={() => {
                // console.log(this.props);
                this.setState({page: 'assignment'});
              }} />
            </View>
          </View>
        )
      }
      return(
        <View>
          <Text> This is Assignments page </Text>
          <View style={style.buttonView}>
            <Button title='Team Members' onPress={() => {
              // console.log(this.props);
              this.setState({page: 'studentTeam'});
            }} />
          </View>
        </View>
      )
    }
}
export default Assignment;
