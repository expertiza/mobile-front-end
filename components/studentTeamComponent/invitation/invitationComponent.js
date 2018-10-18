import React, {Component} from 'react';
import {View, Text} from 'react-native';

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
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },
}

class InvitationComponent extends Component {
  render() {
    return (
      <View style={style.view}>
        <Text style={style.text}>{this.props.name}</Text>
        <Text style={style.text}>{this.props.status}</Text>
      </View>
    );
  }
}

export default InvitationComponent;
