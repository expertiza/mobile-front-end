import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native';

const style = {
  caption: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: '#FF0000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    fontSize: 16,
  },
  view: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    alignItems: 'center',
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    width: 60,
    backgroundColor: '#A90201',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
}

export default class SubmitedContentEditView extends Component {
  render() {
    return (
      <ScrollView style={style.view}>
        <Text style={style.caption}>Submit work for {this.props.assignment.name}</Text>
        <Text style={style.label}>Submit a hyperlink:</Text>
        <View>
          <TextInput style={style.textInput}
          autoCorrect={false}
          defaultValue = 'http://'/>
          <TouchableOpacity style={{...style.button, width: 95}}
          onPress={this.props.handle.uploadLink}>
            <Text style={style.buttonText}>Upload link</Text>
          </TouchableOpacity>
        </View>

        <Text style={style.label}>Hyperlinks:</Text>
        {this.props.links.map((l, i) => (
          <View key={'link_' + i}>
            <TouchableOpacity onPress={this.props.handle.openLink(l)}>
            <Text style={style.link}>{l}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button}
            onPress={this.props.handle.deleteLink}>
              <Text style={style.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          )
        )}
      </ScrollView>
    );
  }
}
