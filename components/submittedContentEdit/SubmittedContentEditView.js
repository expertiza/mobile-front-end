import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

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
  linkView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 20,
  },
  checkBox: {
    marginLeft: -18,
    marginRight: -4,
    paddingLeft: 0,
    paddingRight: 0,
    width: 50,
    height: 45,
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
    marginTop: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    width: 70,
    backgroundColor: '#A90201',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}

export default class SubmitedContentEditView extends Component {
  render() {
    return (
      <ScrollView style={style.view}>
        <Text style={style.caption}>Submit work for {this.props.assignment.name}</Text>
        <Text style={style.label}>Submit a hyperlink</Text>
        <View>
          <TextInput style={style.textInput}
          onChangeText={this.props.handle.inputChange('newLink')}
          underlineColorAndroid='transparent'
          autoCorrect={false} defaultValue={this.props.newLink}/>
          <TouchableOpacity style={style.button}
          onPress={this.props.handle.uploadLink}>
            <Text style={style.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <Text style={style.label}>Hyperlinks</Text>
        {this.props.links.map((l, i) => (
          <View style={style.linkView} key={'link_' + i}>
            <View style={style.checkBox}>
              <CheckBox checked={l.check} onPress={this.props.handle.checkLink(l)}/>
            </View>
            <TouchableOpacity onPress={this.props.handle.openLink(l)}>
              <Text style={style.link}>{l.link}</Text>
            </TouchableOpacity>
          </View>
          )
        )}
        <TouchableOpacity style={style.button}
        onPress={this.props.handle.alertDelete}>
          <Text style={style.buttonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
