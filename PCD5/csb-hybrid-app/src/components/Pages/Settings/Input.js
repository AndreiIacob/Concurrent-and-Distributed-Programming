import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

/**
 * @param {function} props.updateField - handler for the input change
 * @param {string} props.value - the value of the input
 * @param {string} props.title - label for the input
 * @param {boolean} props.enableEdit - OPTIONAL - used to set if the input can be edited or not
 * @param {boolean} props.inputValid - OPTIONAL - used to set the design accordingly (if input is not valid)
 */
const Input = props => {
    const editable = props.hasOwnProperty('enableEdit') ? props.enableEdit : true;
    const valid = props.hasOwnProperty('inputValid') ? props.inputValid : true;

    const inputStyle = [
        styleSheet.input,
        editable ? null : styleSheet.notEditableInput,
        valid ? null : styleSheet.errorInput,
    ];
    return (
        <View style={styleSheet.wrapper}>
            <TextInput
                style={inputStyle}
                value={props.value}
                placeholder={props.title}
                editable={editable}
                onChangeText={props.updateField} />
        </View>
    );
};

export default Input;

const styleSheet = StyleSheet.create({
    wrapper: {
        padding: 10,
        justifyContent: 'center'
    },

    input: {
        minWidth: 350,
        borderColor: '#AAA',
        height: 40,
        fontSize: 16,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },

    errorInput: {
        borderColor: 'rgba(255,0,0,0.5)',
        borderWidth: 2
    },

    notEditableInput: {
        backgroundColor: 'rgba(0,0,0,0.075)'
    }
});