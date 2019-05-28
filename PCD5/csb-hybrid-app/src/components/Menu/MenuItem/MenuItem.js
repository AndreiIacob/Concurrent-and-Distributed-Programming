import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AbstractNavigation from '../../Navigation/AbstractNavigation/AbstractNavigation';

class MenuItem extends Component {

    state = {
        hover: false
    };

    handleMouseEnter = (event) => {
        this.setState({ hover: true });
    }

    handleMouseLeave = (event) => {
        this.setState({ hover: false });
    }

    render() {
        const childrenView = (
            <View style={style.NavLinkContainer}>
                {this.props.data.icon}
                <Text style={style.MenuItemTitle}>{this.props.data.name}</Text>
            </View>
        )
        return (

            <View
                onClick={() => this.props.mobileMenuHandler(false)}
                style={this.state.hover ? style.MenuItemHover : {}}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <AbstractNavigation
                    children={childrenView}
                    navigation={this.props.navigation}
                    to={this.props.data.to} />
            </View>
        )
    }
};

const style = StyleSheet.create({
    MenuItemTitle: {
        paddingLeft: 10,
        paddingBottom: 3,
        fontSize: 13,
        fontWeight: '500',
        color: "#222"
    },

    MenuItemHover: {
        backgroundColor: "#EFEFEF"
    },

    NavLinkContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 40,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0"
    }
});

export default MenuItem;