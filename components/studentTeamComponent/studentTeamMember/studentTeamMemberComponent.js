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
    paddingTop: 3,
    paddingBottom: 3,
    height: 30,
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
  },
  button: {
    alignItems: 'center',
    width: 40,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFFFFF'
  }
}

class StudentTeamMemberComponent extends Component {
  render() {
    return (
      <View style={style.view}>
        <Text style={style.text}>{this.props.name}</Text>
        <View style={style.buttonGroupView}>
          <TouchableOpacity style={style.button} onPress={() => {}}>
            <Text style={style.buttonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={() => {}}>
            <Text style={style.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default StudentTeamMemberComponent;
