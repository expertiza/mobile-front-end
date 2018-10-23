import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';

const style = {
  caption: {
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
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
  button: {
    view: {
      marginLeft: 60,
      marginRight: 60,
      marginTop: 40,
      marginBottom: 300
    },
    style: {
      backgroundColor: "#a90201"
    }
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
            For example, if you are writing on a wiki, you might not want to use your Expertiza user-ID to show up on the wiki, because then your reviewers would know who they are reviewing. So, you are allowed to set up a handle instead. If you have a handle, then your wiki account is named after your handle, and your reviewers see your handle, but not your user-ID.
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
        <View style={style.button.view}>
          <Button buttonStyle={style.button.style} title="Save"
          onPress={this.props.onSubmitHandler} />
        </View>
      </ScrollView>
    )
  }
}
