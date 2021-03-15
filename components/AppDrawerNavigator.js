import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingScreen from '../screens/SettingScreen';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyDonations from '../screens/MyDonation'
import Notification from '../screens/Notification';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen'
import {Icon} from 'react-native-elements';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon: <Icon name  = {'home'} type = {'fontawesome5'}/>
    }
    },
    MyDonations:{
      screen: MyDonations,
      navigationOptions:{
        drawerIcon: <Icon name = {'gift'} type = {'font-awesome'}/>,
        drawerLabel: 'My Donations'

      }
    },
    Notification:{
      screen:Notification,
      navigationOptions:{
        drawerIcon:<Icon name = {'bell'} type = {'font-awesome'}/>
      }
    },
    MyReceivedBooks:{
      screen:MyReceivedBooksScreen,
      navigationOptions:{
        drawerIcon: <Icon name = {'gift'} type = {'font-awesome'}/>,
        drawerLabel: 'My Received Books'
      }
    },
    
Settings:{
    screen : SettingScreen,
    navigationOptions:{
      drawerIcon:<Icon name = {'settings'} type = {'fontawesome5'}/>
    }
    }
    
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })