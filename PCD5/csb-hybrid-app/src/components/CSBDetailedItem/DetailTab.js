import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import NavigationSystem from './NavigationSystem';

export default class DetailTab extends React.Component {

    state = {
        hover: false
    };

    handleMouseEnter() {
        this.setState({
            hover: true
        })
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        })
    }

    isNull = (...args) => {
        let empty = true;
        args.forEach(el => {
            empty = empty && (el === null);
        })
        return empty;
    }

    render() {
        const navigationSystem = !this.props.url ? null : <NavigationSystem {...this.props} />;

        const tabName = !this.props.tabName ? null : (
            <TouchableOpacity>
                <Text style={styleSheet.tabText}>
                    {this.props.tabName}
                </Text>
            </TouchableOpacity>
        );

        const detailValue = !this.props.detailValue ? null : (
            <View style={styleSheet.detailValue}>
                <Text style={styleSheet.tabText}>
                    {this.props.detailValue}
                </Text>
            </View>
        )

        if (this.isNull(navigationSystem, tabName, detailValue)) return null;

        return (
            <View style={[
                styleSheet.tab,
                this.state.hover ? { backgroundColor: '#000000' } : null
            ]}
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}>
                {navigationSystem}
                {tabName}
                {detailValue}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    tab: {
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    tabText: {
        color: '#ffffff',
        textAlign: 'center'
    },

    detailValue: {
        backgroundColor: 'red',
        borderRadius: 25,
        width: 25,
        height: 20,
        marginLeft: 10
    }
});