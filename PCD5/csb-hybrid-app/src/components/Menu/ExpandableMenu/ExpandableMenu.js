import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView, StyleSheet } from 'react-native';

import MenuItem from "../MenuItem/MenuItem";
import AbstractIcon from '../../Image/AbstractIcon';

class ExpandableMenu extends Component {

    state = {
        collapsed: true,
    };

    onPressExpandableMenu() {
        let actualState = this.state.collapsed;
        this.setState({
            collapsed: !actualState
        })
    }

    render() {

        let mIcon = require("./../../../assets/android/baseline_security_black_18dp.png");
        let itemIcon = require("./../../../assets/android/baseline_settings_black_18dp.png");

        let icon = this.state.collapsed ? (<AbstractIcon
            style={style.ArrowIcon}
            source={mIcon}
            name="angle-right"
            size={20}
            color="#FFF" />) :
            (<AbstractIcon
                style={style.ArrowIcon}
                source={mIcon}
                name="angle-down"
                size={20}
                color="#FFF" />);

        let expandableMenuItems = null;

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let items = this.props.data.map((menuItem) => {
            return {
                name: menuItem.name,
                icon: (<AbstractIcon
                    source={itemIcon}
                    name={menuItem.icon.name}
                    size={16}
                    color={menuItem.icon.color} />),
                to: menuItem.to
            }
        });
        const dataSource = ds.cloneWithRows(items);

        if (this.state.collapsed === false) {
            expandableMenuItems = (
                <ListView
                    style={style.Container}
                    dataSource={dataSource}
                    renderRow={(data) => <MenuItem data={data} mobileMenuHandler={this.props.mobileMenuHandler} />}
                />
            )
        }

        return (
            <View>
                <TouchableHighlight
                    onPress={this.onPressExpandableMenu.bind(this)}
                    underlayColor="white">
                    <View style={style.ExpandableMenuLabel}>
                        <Text style={style.Label}>{this.props.title}</Text>
                        {icon}
                    </View>
                </TouchableHighlight>
                {expandableMenuItems}
            </View>
        );
    }
}

const style = StyleSheet.create({
    ExpandableMenuLabel: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        height: 40,
        backgroundColor: "#89bedc"
    },

    Label: {
        paddingLeft: 10,
        paddingBottom: 3,
        fontSize: 14,
        fontWeight: '500',
        color: "#FFF"
    },

    ArrowIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 10
    }
});

export default ExpandableMenu;