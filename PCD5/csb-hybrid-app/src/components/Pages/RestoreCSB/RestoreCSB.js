import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import QRCode from '../../QRCode/QRCode';

export default class RestoreCSB extends React.Component {
    state = {
        address: 'http://192.168.103.149:3000/someEndpointHere',
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({address: text})}
                    value={this.state.address}
                />
                <QRCode
                    value={this.state.address}
                    size={320}
                    bgColor='#3a4a57'
                    fgColor='white'/>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
        height:"100%",
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        minWidth: 250,
        width: '50%',
    }
});