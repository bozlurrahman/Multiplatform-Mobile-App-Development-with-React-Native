// Please Use Updated version of navigation plugins, Otherwise assignment may not work.
// "@react-navigation/drawer": "^5.11.5",
// "@react-navigation/native": "^5.9.0",
// "@react-navigation/stack": "^5.13.0",
// "react-native": "~0.63.4",
// "react-native-elements": "^3.1.0",
import React, {Component} from 'react'
import {ScrollView, FlatList, Text, VirtualizedList} from 'react-native'
import {Avatar, Card, ListItem} from 'react-native-elements'
import {LEADERS} from '../shared/leaders'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History() {
  return (
    <Card>
        <Card.Title>Our History</Card.Title>
        <Card.Divider />
        <Text style={{margin: 10}}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us. {'\n\n'}
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
        </Text>
    </Card>
  )
}

export class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaders: LEADERS,
        }
    }
 
  render() {
        const renderLeaderItem = (item) => {
            // console.log('item   lll: ', item);
            // return;
        return (        
            <ListItem key={item.id} >
                <Avatar source={{ uri: ( baseUrl + item.image )}} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
        }

        const {navigate} = this.props.navigation
        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card>
                        <Card.Title>Corporate Leadership</Card.Title>
                        <Card.Divider />
                        {this.props.leaders.leaders.map(renderLeaderItem)}
                        {/* <FlatList
                            data={this.props.leaders.leaders}
                            renderItem={renderLeaderItem}
                            keyExtractor={item => item.id.toString()}
                        /> */}
                        {/* <VirtualizedList
                            data={this.props.leaders.leaders}
                            renderItem={renderLeaderItem}
                            keyExtractor={item => item.id.toString()}
                            getItemCount={() => this.props.leaders.leaders.length}
                            getItem={(data, index) => data[index]}
                        /> */}
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
        }
    }
}

export default connect(mapStateToProps)(About);
