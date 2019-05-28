import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * @param {function} props.actionHandler - the handler to the action
 * @param {string} props.label - the label for the button
 */
const ActionButton = (props) => {
    const actionWrapperStyle = [
        styleSheet.actionWrapper,
        props.hasOwnProperty('backgroundColor') ? { backgroundColor: props.backgroundColor } : null
    ];

    return (
        <View style={styleSheet.wrapper}>
            <View style={actionWrapperStyle}>
                <TouchableOpacity
                    onPressOut={() => {
                        props.actionHandler();
                    }}>
                    <Text style={styleSheet.label}>{props.label}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ActionButton;

const styleSheet = StyleSheet.create({
    wrapper: {
        padding: 10,
        justifyContent: 'center'
    },

    actionWrapper: {
        width: '15%',
        minWidth: 150,
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2c7daf',
        alignSelf: 'center'
    },

    label: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#fff'
    }
});