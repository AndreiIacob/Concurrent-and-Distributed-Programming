import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export default class Tab extends React.Component {

    render() {
        return (<View style={[style.tabContainer, {borderBottomWidth: this.props.activeTab === this.props.tabFor?1:0}]}>
            <TouchableHighlight onPress={() => this.props.tabChanged(this.props.tabFor)}>
                <Text style={style.tabTitle}>{this.props.children}</Text>
            </TouchableHighlight>
        </View>)
    }
}

const style = StyleSheet.create({
    tabContainer: {
        paddingTop: 15,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: 200,
        height: 48,
        marginRight: 20,
        borderBottomColor: "#2196f3",
        borderBottomWidth: 1
    },
    tabTitle: {
        textAlign: "center",
        color: "#2196f3",
        fontSize: 15
    }
});
