import React, {Component} from 'react';
import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import * as actions from '../../../redux/index';

const style = {
  reviewView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 20,
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
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    width: 240,
  },
}

export default class ResponseEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      comment: this.props.ans.comments,
    }
    for (func in this.handle) {
      this.handle[func] = this.handle[func].bind(this);
    }
  }
  handle = {
    openEdit: () => {
      this.state.edit = true;
      this.setState(this.state);
    },
    handleEdit: () => {
      this.state.edit = false;
      this.props.editComment(this.state.comment);
    },
    handleInputChange: (value) => {
      this.state.comment = value;
      this.setState(this.state);
    },
  }
  render() {
    if (this.state.edit) {
      return (
        <View style={style.reviewView}>
          <TextInput style = {style.textInput} multiline={true}
          onChangeText={this.handle.handleInputChange}
          defaultValue={this.state.comment}
          underlineColorAndroid='transparent' autoCorrect={false}/>
          <TouchableOpacity style={style.button} onPress={this.handle.handleEdit}>
            <Text style={style.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={style.reviewView}>
          <Text onPress={this.handle.openEdit}>{this.state.comment}</Text>
        </View>
      );
    }
  }
}
