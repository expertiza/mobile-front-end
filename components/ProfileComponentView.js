import React, {Component} from 'react';
import {ScrollView, View, Text, TextInput, Picker, Switch, Button} from 'react-native';

const style = {
  label:{
    marginTop: 10
  },
  textInput: {
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  picker: {
    border: {
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 1
    }
  },
  submit: {
    marginTop: 15
  }
}

class ProfileView extends Component {
  render() {
    return(
      <ScrollView className="profileform container-fluid">
        <View>
          <Text style={style.label}>Name (last, first[ middle]):</Text>
          <TextInput id='fullname' name='fullname' className='form-control'
          defaultValue={this.props.profileform.fullname}
          onChangeText={this.props.handleInputChange('fullname')}
          style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>

          <Text style={style.label}>Password:</Text>
          <TextInput id="password" name="password" className='form-control' secureTextEntry={true}
          onChangeText={this.props.handleInputChange('password')} onBlur={this.props.handleBlur('password')}
          style={style.textInput} underlineColorAndroid='transparent'/>
          <Text style={style.label}>Confirm Password:</Text>
          <TextInput id="confirmpassword" name="confirmpassword" className='form-control'
          secureTextEntry={true} onChangeText={this.props.handleConfirmpassword}
          onBlur={this.props.handleBlur('confirmpassword')}
          style={style.textInput} underlineColorAndroid='transparent'/>
          <Text>If password field is blank, the password will not be updated.</Text>

          <Text style={style.label}>E-mail address:</Text>
          <TextInput id='email' name='email' className='form-control'
          defaultValue={this.props.profileform.email} onChangeText={this.props.handleInputChange('email')}
          style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>

          <Text style={style.label}>Institution:</Text>
          <View style={style.picker.border}>
            <Picker selectedValue={this.props.profileform.institution_id}
            onValueChange={this.props.handleInputChange('institution_id')}>
              {this.props.institutions.institutions && 
                this.props.institutions.institutions.map((institution) => (
                  <Picker.Item key={'institution_'+institution.id} 
                  label={institution.name} value={institution.id}/>
                ))}
            </Picker>
          </View>
        </View>

          <View>
            <Text style={style.label}>Username:</Text>
            <TextInput id="handle" name="handle" defaultValue={this.props.profileform.handle} 
            onChangeText={this.props.handleInputChange('handle')} className='form-control'
            style={style.textInput} underlineColorAndroid='transparent' autoCorrect={false}/>
          </View>

          <Button style={style.submit} title='Save' disabled={this.props.errors.confirmpassword!==''} 
            onPress={(e) => {this.props.handleSubmit();}} />
      </ScrollView>
    );
  }
}
export default ProfileView;
