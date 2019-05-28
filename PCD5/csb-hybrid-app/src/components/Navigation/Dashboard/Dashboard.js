import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom'
import Radium from 'radium';

const dashboard = (props) => {
    const RadiatingLink = Radium(Link);
    return (
        <View
            style={style.dashboard}>
            <RadiatingLink
                onClick={() => props.mobileMenuHandler(false)}
                to="/">
                {props.children}
            </RadiatingLink>
        </View>
    )
}

const style = StyleSheet.create({
    dashboard: {
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        padding: 15,
        height: 55,
        borderStyle: "solid",
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1
    }
});

export default dashboard;