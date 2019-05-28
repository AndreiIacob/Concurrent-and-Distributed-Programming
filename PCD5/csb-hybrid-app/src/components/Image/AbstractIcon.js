import React from 'react';
import { View } from 'react-native';
import Icon from "react-native-vector-icons/dist/FontAwesome"

const AbstractIcon = (props) => {

    if (props.name != null) {
        return (
            <View style={props.style}>
            <Icon name={props.name} size={props.size} color={props.color} /></View>
        )
    } else {
        return (
            <View style={props.style}>{props.source}</View>
        )
    }
}

export default AbstractIcon;