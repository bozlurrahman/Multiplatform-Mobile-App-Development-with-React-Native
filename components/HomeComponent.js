import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Lorem</Text>
                <Button onPress={() => this.props.navigation.toggleDrawer()} title="Toggle Drawer" />
            </View>
        );
    }
}

export default Home;