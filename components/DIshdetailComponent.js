import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}


class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        console.log('this.props', this.props);
        const {dishId} = this.props.route.params || {dishId: 0};
        return(
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]} />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}


export default Dishdetail;