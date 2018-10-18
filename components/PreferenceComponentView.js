import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, Picker, Switch, Button} from 'react-native';

const style = {
  label:{
    fontWeight: 'bold',
    marginTop: 10
  },
  submit: {
    view: {
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10
    }
  }
}

class PreferenceView extends Component {
  render() {
    return(
      <ScrollView className="profileform container-fluid">
          <View>
            <Text style={style.label}>E-mail options</Text>
            <Text>Check the boxes representing the times when you want to receive e-mail.</Text>
            <Text>When someone else reviews my work</Text>
            <Switch id='email_on_review' name='email_on_review' value={this.props.profileform.email_on_review}
            onValueChange={this.props.handleInputChange('email_on_review')} />
            <Text>When someone else submits work I am assigned to review</Text>
            <Switch id='email_on_submission' name='email_on_submission' 
            value={this.props.profileform.email_on_submission}
            onValueChange={this.props.handleInputChange('email_on_submission')} />
            <Text>When someone else reviews one of my reviews (metareviews my work)</Text>
            <Switch id='email_on_review_of_review' name='email_on_review_of_review'
            value={this.props.profileform.email_on_review_of_review}
            onValueChange={this.props.handleInputChange('email_on_review_of_review')} />
            <Text>Send me copies of emails sent for assigments</Text>
            <Switch id='copy_of_emails' name='copy_of_emails' value={this.props.profileform.copy_of_emails}
            onValueChange={this.props.handleInputChange('copy_of_emails')} />
          </View>

          <View style={style.submit.view}>
            <Button style={style.submit} title='Save'
              onPress={(e) => {this.props.handleSubmit();}} />
          </View>
      </ScrollView>
    );
  }
}
export default PreferenceView;
