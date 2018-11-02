import React from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0), 
  }

  componentDidMount() {
    Animated.timing(               
      this.state.fadeAnim,          
      {
        toValue: 1,                  
        duration: 3000,              
      }
    ).start();                      
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <View>   
        <Animated.View                
            style={{
            ...this.props.style,
            opacity: fadeAnim,     
            }}
        >
        {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

export default FadeInView;
