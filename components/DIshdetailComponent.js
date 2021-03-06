import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment, date) => dispatch(postComment(dishId, rating, author, comment, date)),
})

const RenderDish = props => {

    const dish = props.dish;
    // const imag = DISHES.filter(function(dis){return dish.id == dis.id})[0].image;
    // console.log('imag:', imag);
    // const img_path = require( './'+ imag );
    // console.log('img_path:', img_path);

    handleViewRef = ref => this.view = ref;
 
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if (dx > 100) return true
        else return false
    }
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            } else if (recognizeComment(gestureState)) {
                props.toggleModal()
            }
            return true;
        }
    });
    
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }
    
    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    {/* <Card.Image source={require( './'+ DISHES.filter(function(dis){return dish.id == dis.id})[0].image )} /> */}
                    {/* <Card.Image source={ img_path } /> */}
                    <Card.Image source={{uri: (baseUrl + dish.image)}} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.buttons}>
                        <Icon raised reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome' color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon raised reverse
                            name="pencil"
                            type='font-awesome' color='#512da8'
                            onPress={() => props.toggleModal()}
                        />
                        <Icon raised reverse
                            name='share' 
                            // style={styles.cardItem}
                            type='font-awesome' color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = (item) => {
        
        return (
            <View key={item.id} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                {/* <Text style={{fontSize: 12}}>{item.rating} Stars</Text> */}
                <Rating imageSize={10} readonly startingValue={parseInt(item.rating)} style={StyleSheet.flatten(styles.rating)} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
            
    const FlatListrenderCommentItem = ({item}) => {
        return (renderCommentItem(item));
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card>
            <Card.Title>Comments</Card.Title>
            {comments.map(renderCommentItem)}
            {/* <FlatList 
                data={comments}
                renderItem={FlatListrenderCommentItem}
                keyExtractor={item => item.id.toString()}
                /> */}
        </Card>
        </Animatable.View>
    );
}


class Dishdetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
          showModal: false,
          rating: 5,
          author: '',
          comment: '',
        }
        this.handleRating = this.handleRating.bind(this)
        this.handleComment = this.handleComment.bind(this)
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState(state => ({showModal: !state.showModal}))
    }

    handleRating(rating) {
        this.setState({
            rating: rating,
        })
    }

    handleComment(dishId) {
        const {rating, author, comment} = this.state
        this.props.postComment(dishId, rating, author, comment, new Date())
        this.toggleModal()
    }

    resetForm() {
        this.setState({rating: 5, author: '', comment: ''})
    }

    render() {
        // console.log('this.props', this.props);
        const {dishId} = this.props.route.params || {dishId: 0};
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                    favorite={this.props.favorites.some(el => el === dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType="slide" transparent={false} visible={this.state.showModal}
                    onDismiss={() => {
                        this.toggleModal()
                    }}
                    onRequestClose={() => {
                        this.toggleModal()
                }} >
                    <View style={styles.modal}>
                        <Rating showRating minValue={1} ratingCount={5} startingValue={5} onFinishRating={e => this.handleRating(e)} />
                        <Input style={styles.formRow} placeholder=" Author" leftIcon={{type: 'font-awesome', name: 'user-o'}} onChangeText={text => this.setState({author: text})} />
                        <Input placeholder=" Comment" style={styles.formRow} leftIcon={{type: 'font-awesome', name: 'comment-o'}} onChangeText={text => this.setState({comment: text})} />

                        <Button style={styles.formRow} onPress={() => {this.handleComment(dishId) }} color="#512da8" title="Submit" />
                        <Button style={styles.formRow} onPress={() => { this.toggleModal() }} color="#8f8f8f" title="Close" />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 30,
    },
  
    modal: {
      justifyContent: 'center',
      margin: 20,
    },
  
    buttons: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20,
    },
    rating: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);