import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @param {string} props.text - The text to be displayed
 */
const TitleText = (props) => {
    return (
        <View style={styleSheet.titleTextWrapper}>
            <Text style={styleSheet.titleText}>{props.text}</Text>
        </View>
    );
};

export default TitleText;

const styleSheet = StyleSheet.create({
    titleTextWrapper: {
        padding: 10,
        marginVertical: 10
    },

    titleText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
    }
});