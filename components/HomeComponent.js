import React, { Component } from 'react';
import { Button, Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
    
    const item = props.item;
    
    if (item != null) {
        return(
            <Card>
                <Card.Title>{item.name}</Card.Title>
                {/* <Card.Image source={require( './'+ DISHES.filter(function(dis){return dish.id == dis.id})[0].image )} /> */}
                {/* <Card.Image source={ img_path } /> */}
                <Card.Image source={require('./images/uthappizza.png')} />
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>        
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          dishes: DISHES,
          promotions: PROMOTIONS,
          leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.state.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.state.promotions.filter((promo) => promo.featured)[0]} />
                <RenderItem item={this.state.leaders.filter((leader) => leader.featured)[0]} />
                <Button onPress={() => this.props.navigation.toggleDrawer()} title="Toggle Drawer" />
            </ScrollView>
        );
    }

}

export default Home;