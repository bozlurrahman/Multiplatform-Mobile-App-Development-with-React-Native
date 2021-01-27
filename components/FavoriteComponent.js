import React, { Component } from 'react';
import { Animated, StyleSheet, FlatList, View, Text } from 'react-native';
import {Avatar, Card, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

const AnimatedText = Animated.createAnimatedComponent(Text);

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            const rightButton = (progress, dragX) => {
                const scale = dragX.interpolate({
                  inputRange: [-80, 0],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                });
                return (
                  <RectButton style={styles.rightAction} 
                    // onPress={this.close}
                    onPress= {() => this.props.deleteFavorite(item.id)}
                    >
                      <AnimatedText color="#fff" style={[styles.actionIcon, { transform: [{ scale }] }]}>Delete</AnimatedText>
                  </RectButton>
                );
            };

            return (
                <Swipeable renderRightActions={rightButton}>
                <ListItem key={item.id} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                    <Avatar source={{ uri: ( baseUrl + item.image )}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                </Swipeable>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}

const styles = StyleSheet.create({
    actionIcon: {
      width: 80,
      marginHorizontal: 10,
    },
    rightAction: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#dd2c00',
      flex: 1,
      justifyContent: 'flex-end',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
