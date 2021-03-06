import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from './ProfileComponent/ProfileComponent';
import Preference from './PreferenceComponent/PreferenceComponent';
import Assignment from './AssignmentComponent/AssignmentComponent';
import AssignmentDetails from './AssignmentDetailsComponent/AssignmentDetailsComponent';
import ChangeHandle from './ChangeHandle/ChangeHandleComponent';
import StudentTeamComponent from './studentTeamComponent/StudentTeamComponent';
import Logout from './Auth/logoutComponent';
import Login from './Auth/loginComponent';
import AuthLoadingScreen from './Auth/AuthLoading';

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

const PreferenceNavigator = createStackNavigator({
    Preference: { screen: Preference }
  },
  {
    initialRouteName: 'Preference',
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
    Assignment: { screen: Assignment },
    Details: {screen: AssignmentDetails },
    ChangeHandle: {screen: ChangeHandle},
    StudentTeamComponent: {screen: StudentTeamComponent},
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

    })
}
);

const LogoutNavigator = createStackNavigator({
    Logout: { screen: Logout }
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
<View style={styles.container}>
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
</View>
);

const MainNavigator = createDrawerNavigator({
    Home:
      { screen: AssignmentNavigator,
        navigationOptions: {
          title: 'Assignments',
          drawerLabel: 'Assignments   '
        }
      },
    Profile:
      { screen: ProfileNavigator,
        navigationOptions: {
          title: 'Profile',
          drawerLabel: 'Profile  '
        },
      },
    Preference:
    { screen: PreferenceNavigator,
      navigationOptions: {
        title: 'Setting',
        drawerLabel: 'Setting  '
      },
    },
    Logout:
      { screen: LogoutNavigator,
        navigationOptions: {
          title: 'Logout',
          drawerLabel: 'Logout  '
        },
      },
}, {
  drawerBackgroundColor: '#ffffff',
  contentComponent: CustomDrawerContentComponent
});

const AuthNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainNavigator,
    Auth: LoginNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <View style={styles.container}>
            <AuthNavigator />
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
