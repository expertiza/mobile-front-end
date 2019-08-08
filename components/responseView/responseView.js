import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Picker} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ResponseEditComponent from './responseEdit/responseEditComponent';

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
  question: {
    color: '#0000FF',
    marginTop: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  questionView: {
    marginBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  link: {
    marginBottom: 15,
    color: '#FF0000',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  view: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  reviewView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  score: {
    alignItems: 'center',
    marginTop: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 80,
    backgroundColor: '#DDDDDD',
    width: 35,
  },
  scoreText: {
    // color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreDrop: {
    marginLeft: -18,
    // marginTop: -50,
    paddingLeft: 5,
    paddingRight: 5,
    width: 46,
    height: 205,
    borderRadius: 80,
    // backgroundColor: 'rgba(255,255,255,0)',
  },
}

export default class ResponseView extends Component {
  render() {
    return (
        <ScrollView style={style.view}>
          <Text style={style.caption}>
            Review for {this.props.response.assignment.name}
          </Text>
          <Text>You are reviewing improve survey functionality</Text>
          <Text style={style.label}>Hyperlinks</Text>
          {this.props.response.linkArray.map((l, i) => (
            <TouchableOpacity key={'link_' + i}
            onPress={this.props.handle.openLink(l)}>
              <Text style={style.link}>{l.link}</Text>
            </TouchableOpacity>
          ))}
          <Text style={style.label}>Review</Text>
          {this.props.response.questions.map((q, i) => (
            <View style={style.questionView} key={'review_' + i}>
              <Text style={style.question}>{i + 1}. {q.txt}</Text>
              <View style={style.reviewView}>
                <View style={{...style.score,
                  backgroundColor: this.props.handle.calcColor(q.ans.answer)}} >
                  <ModalDropdown textStyle={style.scoreText}
                  dropdownStyle={style.scoreDrop}
                  defaultValue={q.ans.answer.toString()}
                  options={['1', '2', '3', '4', '5']}
                  renderRow={(val) => (
                    <View style={{...style.score,
                      backgroundColor: this.props.handle.calcColor(Number(val))}}>
                      <Text style={style.scoreText}>
                        {val}
                      </Text>
                    </View>
                  )}
                  renderSeparator={() => (<View></View>)}
                  onSelect={this.props.handle.editScore(i)}
                  />
                </View>
                <ResponseEditComponent ans={q.ans}
                editComment={this.props.handle.editComment(i)}/>
              </View>
            </View>
          ))}
          <View style={style.questionView}>
            <Text style={style.label}>Additional Comment</Text>
            <Text>{this.props.response.additional_comment}</Text>
          </View>
          <View style={{marginBottom: 200}}>
          </View>
        </ScrollView>
    );
  }
}
