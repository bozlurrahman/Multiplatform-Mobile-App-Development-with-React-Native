import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';
import Contact from './ContactComponent';
import About from './AboutComponent';

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
});
const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
}, {
  navigationOptions: ({ navigation }) => ({
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
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff"  
  })
});


const MenuNavigator = createStackNavigator(
{
  Menu: {screen: Menu},
  Dishdetail: {screen: Dishdetail},
  Home: {screen: Home}
}, 
{
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff" 
    }
  }

})


const MainNavigator = createDrawerNavigator(
  {
    Home: 
    {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerlabel: "Home"
      }
    },
    Menu: 
    {
      screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      }
    },
    Contact: 
    {
      screen: ContactNavigator,
      navigationOptions: {
        title: 'Contact',
        drawerLabel: 'Contact'
      }
    },
    About: 
    {
      screen: AboutNavigator,
      navigationOptions: {
        title: 'About Us',
        drawerLabel: 'About Us'
      }
    },
      
  },
  {drawerBackgroundColor: '#D1C4E9'}
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish:null,
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId}); 
  }

  render() {
 
    return (
        <View style={{flex:1}}>
          {/* <Menu dishes={this.state.dishes} onPress={dishId =>this.onDishSelect(dishId)} />
          <Dishdetail dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} /> */}
          <MainNavigator />
        </View>
    );
  }
}
  
export default Main;