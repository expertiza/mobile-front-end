import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from './ProfileComponent';
import Assignment from './AssignmentComponent';
import Login from './loginComponent';

const ProfileNavigator = createStackNavigator({
        Profile: { screen: Profile }
    },
    {
        initialRouteName: 'Profile',
        navigationOptions: ({ navigation }) => ({
          headerStyle: {
              backgroundColor: "#a90201"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }}
            onPress={ () => navigation.toggleDrawer() } />
        })
    }
);

const AssignmentNavigator = createStackNavigator({
    Assignment: { screen: Assignment }
},
{
    initialRouteName: 'Assignment',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#a90201"
      },
      headerTitleStyle: {
          color: "#fff"
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }}
        onPress={ () => navigation.toggleDrawer() } />
    })
}
);

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#a90201"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }}
      onPress={ () => navigation.toggleDrawer() } />
  })
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View>
            <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Login:
      { screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login  ',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
    },
    Home: 
      { screen: AssignmentNavigator,
        navigationOptions: {
          title: 'Assignments',
          drawerLabel: 'Assignment  '
        }
      },
    Menu: 
      { screen: ProfileNavigator,
        navigationOptions: {
          title: 'Profile',
          drawerLabel: 'Profile  '
        }, 
      }
}, {
  drawerBackgroundColor: '#ffffff',
  contentComponent: CustomDrawerContentComponent
});


class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <View style={styles.container}>
            <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    drawerHeader: {
      backgroundColor: '#a90201',
      height: 240,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 0,
    }
});

  
export default Main;