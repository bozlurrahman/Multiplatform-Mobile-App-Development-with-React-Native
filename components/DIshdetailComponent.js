import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

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
                    <Card.Image source={{uri: (baseUrl + dish.image)}} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon raised reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome' color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
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
            comments: COMMENTS,
            favorites: []
        };
    }

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        console.log('this.props', this.props);
        const {dishId} = this.props.route.params || {dishId: 0};
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps)(Dishdetail);