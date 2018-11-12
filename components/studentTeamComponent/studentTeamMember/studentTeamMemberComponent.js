import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const style = {
  view: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    height: 35,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonGroupView: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 100,
  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    backgroundColor: "#a90201",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
}

class StudentTeamMemberComponent extends Component {
  render() {
    return (
      <View style={style.view}>
        <Text style={style.text}>{this.props.name}</Text>
        <View style={style.buttonGroupView}>
          {this.props.actions.map((action) => (
            <TouchableOpacity key={'action_' + action.id}
            style={style.button} onPress={action.handler}>
              <Text style={style.buttonText}>{action.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default StudentTeamMemberComponent;
