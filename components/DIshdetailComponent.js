import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {

    const dish = props.dish;
    // const imag = DISHES.filter(function(dis){return dish.id == dis.id})[0].image;
    // console.log('imag:', imag);
    // const img_path = require( './'+ imag );
    // console.log('img_path:', img_path);
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    {/* <Card.Image source={require( './'+ DISHES.filter(function(dis){return dish.id == dis.id})[0].image )} /> */}
                    {/* <Card.Image source={ img_path } /> */}
                    <Card.Image source={require('./images/uthappizza.png')} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        console.log('this.props', this.props);
        const {dishId} = this.props.route.params;
        return(
            <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
}


export default Dishdetail;