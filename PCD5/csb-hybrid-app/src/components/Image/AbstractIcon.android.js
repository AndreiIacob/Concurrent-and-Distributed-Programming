import React from 'react';
import { Image, View } from 'react-native';

const AbstractIcon = (props) => {
    return (
        <View style={props.style}><Image style={props.style} resizeMode="contain" source={props.source} /></View>
    )
}
export default AbstractIcon;