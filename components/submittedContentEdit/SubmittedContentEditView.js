import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native';

const style = {
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    fontSize: 16,
  },
}

export default class SubmitedContentEditView extends Component {
  render() {
    return (
      <ScrollView>
        <Text>Submit work for {this.props.assignment.name}</Text>
        <Text>Submit a hyperlink:</Text>
        <View>
          <TextInput style={style.textInput}
          autoCorrect={false}
          defaultValue = 'http://'/>
          <TouchableOpacity onPress={this.props.handle.uploadLink}>
            <Text>Upload link</Text>
          </TouchableOpacity>
        </View>

        <Text>Hyperlinks:</Text>
        {this.props.links.map((l, i) => (
          <View key={'link_' + i}>
            <TouchableOpacity onPress={this.props.handle.openLink(l)}>
            <Text>{l}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.handle.deleteLink}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
          )
        )}
      </ScrollView>
    );
  }
}
