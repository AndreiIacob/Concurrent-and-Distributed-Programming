import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AssetInformation = (props) => {
    const Messages = () => {
        return props.progressMessages.map((message, index) => {
            return <Message key={message + index} message={message} />
        })
    };

    const Message = (props) => {
        return (
            <View style={styleSheet.messageWrapper}>
                <Text style={styleSheet.messageText}>{props.message}</Text>
            </View>
        );
    };

    return (
        <View style={styleSheet.wrapper}>
            <Messages />
        </View>
    );
};

export default AssetInformation;

const styleSheet = StyleSheet.create({
    wrapper: {
        height: '50%',
        paddingTop: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    messageWrapper: {
        margin: 10,
        padding: 5
    },

    messageText: {
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: '14',
        color: '#616161'
    }
});