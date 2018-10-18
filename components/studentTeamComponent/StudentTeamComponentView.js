import React, {Component} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import StudentTeamMemberComponent from './studentTeamMember/studentTeamMemberComponent';
import InvitationComponent from './invitation/invitationComponent';

const style = {
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonView: {
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10,
  }
}

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
          id: 0,
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
          id: 0,
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

class StudentTeamView extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={style.label}>Team Name:</Text>
        <View style={style.view}>
          <Text style={style.text}>{mock.teamName}</Text>
          <Button title='Edit name' onPress={() => {}} />
        </View>
        <Text style={style.label}>Team Members:</Text>
        {mock.members.map((member) =>
          (<StudentTeamMemberComponent
            key={'member_' + member.id} name={member.name}
            actions={member.actions} />))}
        <Text style={style.label}>Sent Invitations:</Text>
        {mock.invitations.map((invitation) =>
          (<InvitationComponent
            key={'invitation_' + invitation.id} name={invitation.name}
            status={invitation.status} />))}
        <View style={style.buttonView}>
          <Button title='Advertisement for teammates' onPress={(e) => {
            console.log('StudentTeamView.props: ', this.props);
          }} />
        </View>
      </ScrollView>
    );
  }
}

export default StudentTeamView;
