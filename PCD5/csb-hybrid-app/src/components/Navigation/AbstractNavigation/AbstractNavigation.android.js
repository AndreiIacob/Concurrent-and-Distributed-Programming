import React from 'react';
import { TouchableHighlight } from 'react-native';

const AbstractNavigation = (props) => {
    return (
        <TouchableHighlight onPress={() => props.navigation.navigate(props.to.native, props.extraBundle)} >
            {props.children}
        </TouchableHighlight>
    )
}

export default AbstractNavigation;