import React, {Component} from 'react';
import {View, Text} from 'react-native';
import style from './CSBGridItem.style';
import AbstractNavigation from '../Navigation/AbstractNavigation/AbstractNavigation';

class CSBGridItem extends Component {

    render() {
        // console.log('data', this.props.data);
        const childrenView = (
            <View style={style.NavLinkContainer}>
                {this.props.data.icon}
                <Text style={style.item}>{this.props.data.name}</Text>
            </View>
        );
        return (

            <View>
                <AbstractNavigation
                    children={childrenView}
                    navigation={this.props.navigation}
                    to={this.props.data.to} />
                    
            </View>
        )
    }
};
export default CSBGridItem;