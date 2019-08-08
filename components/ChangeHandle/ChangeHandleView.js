import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

const style = {
  caption: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
  },
  header: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },
  textInput: {
    marginTop: 10,
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
  submit: {
    view: {
      flex: 1,
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 70,
      marginRight: 20,
      marginTop: 40,
      marginBottom: 40
    },
    button: {
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      width: 200,
      // height: 40,
      backgroundColor: "#a90201"
    }
  },
  help: {
    button: {
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 20,
      width: 30,
      height: 30,
      backgroundColor: '#2196F3',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
}

const helpInfo = (show) => {
  console.log('showHelp', show);
  if (show) {
    return (
      <View style={style.view}>
        <Text style={style.header}>
          Why change handle?
        </Text>
        <Text style={style.text}>
          If you are writing on a wiki, you might not want to use your Expertiza user-ID to show up on the wiki, because then your reviewers would know who they are reviewing. So, you are allowed to set up a handle instead. If you have a handle, then your wiki account is named after your handle, and your reviewers see your handle, but not your user-ID.
        </Text>
        <Text style={style.text}>
          If you do not have a handle, your user-ID will be used instead.
        </Text>
        <Text style={style.text}>
          You can set up a handle in two ways:
        </Text>
        <View style={style.view}>
          <Text style={style.text}>
            1. You can set up a handle for only this assignment by entering a handle below.
          </Text>
          <Text style={style.text}>
            2. You can set up a "default" handle by editing your Profile
          </Text>
        </View>
        <Text style={style.text}>
          Note that if you change your handle by editing your profile, your new handle will be used for all future assignments; if you want the change to apply to this assignment too, you must also change it below.
        </Text>
      </View>
    )
  } else {
    return (
      <View>
      </View>
    );
  }
}

export default class ChangeHandleView extends Component {

  render() {
    // console.log('ChangeHandle.props.participant: ', this.props.participant);
    return (
      <ScrollView>
        <Text style={style.caption}>Create or Change Handle for Current Assignment</Text>
        <View style={style.view}>
          <Text style={style.text}>
            Change handle for current assignment:
          </Text>
          <TextInput style={style.textInput} id='handle' name='handle'
          value={this.props.participant_handle}
          onChangeText={this.props.handleNameChangeHandler}
          underlineColorAndroid='transparent' autoCorrect={false}/>
          <Text style={style.text}>
            Warning: You must have a wiki account named after your handle. If you do not, please e-mail your instructor or the course staff.
          </Text>
        </View>
        <View style={style.submit.view}>
          <TouchableOpacity style={style.submit.button} onPress={this.props.onSubmitHandler} >
            <Text style={style.help.text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.help.button} onPress={this.props.handleHelp}>
            <Text style={style.help.text}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={style.help.view}>
        </View>
        {helpInfo(this.props.showHelp)}
      </ScrollView>
    )
  }
}