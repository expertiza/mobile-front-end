import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, Picker, Switch, Button} from 'react-native';

const style = {
  view: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  label:{
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    border: {
      backgroundColor: '#DDDDDD',
      borderRadius: 5,
    },
  },
  submit: {
    view: {
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10,
    }
  }
}

class ProfileView extends Component {
  render() {
    return(
      <ScrollView className="profileform container-fluid">
        <View style={style.view}>
          <Text style={style.label}>Name:</Text>
          <TextInput id='fullname' name='fullname' className='form-control'
          defaultValue={this.props.profileform.fullname}
          onChangeText={this.props.handleInputChange('fullname')}
          style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>
        </View>

        <View style={style.view}>
          <Text style={style.label}>Password:</Text>
          <TextInput id="password" name="password" className='form-control' secureTextEntry={true}
          onChangeText={this.props.handleInputChange('password')} onBlur={this.props.handleBlur('password')}
          style={style.textInput} underlineColorAndroid='transparent'/>
        </View>

        <View style={style.view}>
          <Text style={style.label}>Confirm Password:</Text>
          <TextInput id="confirmpassword" name="confirmpassword" className='form-control'
          secureTextEntry={true} onChangeText={this.props.handleConfirmpassword}
          onBlur={this.props.handleBlur('confirmpassword')}
          style={style.textInput} underlineColorAndroid='transparent'/>
          <Text>If password field is blank, the password will not be updated.</Text>
        </View>

        <View style={style.view}>
          <Text style={style.label}>E-mail address:</Text>
          <TextInput id='email' name='email' className='form-control'
          defaultValue={this.props.profileform.email} onChangeText={this.props.handleInputChange('email')}
          style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>
        </View>

        <View style={style.view}>
          <Text style={style.label}>Institution:</Text>
          <View style={style.picker.border}>
            <Picker
            selectedValue={this.props.profileform.institution_id}
            onValueChange={this.props.handleInputChange('institution_id')}>
              {this.props.institutions.institutions &&
                this.props.institutions.institutions.map((institution) => (
                  <Picker.Item key={'institution_'+institution.id}
                  label={institution.name} value={institution.id}/>
                ))
              }
            </Picker>
          </View>
        </View>

        <View style={style.view}>
          <Text style={style.label}>Username:</Text>
          <TextInput id="handle" name="handle" defaultValue={this.props.profileform.handle}
          onChangeText={this.props.handleInputChange('handle')} className='form-control'
          style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>
        </View>

        <View style={style.submit.view}>
          <Button title='Save' disabled={this.props.errors.confirmpassword!==''}
            onPress={(e) => {this.props.handleSubmit();}} />
        </View>
      </ScrollView>
    );
  }
}
export default ProfileView;
