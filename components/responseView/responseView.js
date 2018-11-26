import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';

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
  questionView: {
    marginBottom: 15,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  reviewView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 20,
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
  score: {
    alignItems: 'center',
    marginTop: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    width: 30,
  },
  scoreText: {
    // color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
              <Text style={style.label}>{i + 1}. {q.txt}</Text>
              <View style={style.reviewView}>
                <TouchableOpacity style={{...style.score,
                  backgroundColor: q.ans.color}}>
                  <Text style={style.scoreText}>{q.ans.answer}</Text>
                </TouchableOpacity>
                <Text>{q.ans.comments}</Text>
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
