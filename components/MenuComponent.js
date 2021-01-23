import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (
                <ListItem bottomDivider key={index} onPress={() => navigate('Dishdetail', { dishId: item.id })} >
                    {/* <Avatar source={{uri: require('./'+item.image.toString() ) }} /> */}
                    {/* <Avatar source={{uri: 'https://placeimg.com/640/480/any'}} /> */}
                    <Avatar source={ require('./images/uthappizza.png') } />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}


export default Menu;
