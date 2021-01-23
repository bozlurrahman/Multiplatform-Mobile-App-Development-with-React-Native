import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { Icon } from 'react-native-elements';


const HomeNavigator = createStackNavigator( {
    Home: { screen: Home }
},
{  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: Aboutus }
});

const MenuNavigator = createStackNavigator( {
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
},
{
    initialRouteName: 'Menu',
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
});

const MainNavigator = createAppContainer(createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Aboutus: 
      { screen: AboutNavigator,
        navigationOptions: {
          title: 'About us',
          drawerLabel: 'About us'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }
      },
    Contact: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact us',
          drawerLabel: 'Contact us'
        }
      }
}, { drawerBackgroundColor: '#D1C4E9' }));


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        })
    }

    render() {
        return ( 
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
        );
    }
}

export default Main;