import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
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
  },
  button: {
    backgroundColor: "#a90201"
  }
}

class StudentTeamView extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={style.label}>Team name</Text>
        <View style={style.view}>
          <Text style={style.text}>{this.props.teamName}</Text>
        </View>
        <View style={style.view}>
          <Button buttonStyle={style.button} title='Edit name' onPress={() => {}} />
        </View>
        <Text style={style.label}>Team members</Text>
        {this.props.members.map((member) =>
          (<StudentTeamMemberComponent
            key={'member_' + member.id} name={member.name}
            actions={member.actions} />))}
        <Text style={style.label}>Sent invitations</Text>
        {this.props.invitations.map((invitation) =>
          (<InvitationComponent
            key={'invitation_' + invitation.id} name={invitation.name}
            status={invitation.status} />))}
        <View style={style.buttonView}>
          <Button buttonStyle={style.button} title='Advertisement for teammates' onPress={(e) => {
            console.log('StudentTeamView.props: ', this.props);
          }} />
        </View>
      </ScrollView>
    );
  }
}

export default StudentTeamView;
