import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AbstractIcon from '../../../components/Image/AbstractIcon';
import CSBGridItem from '../../../components/CSBGridItem/CSBGridItem';

class FrameLayoutContainer extends Component {

    render() {

        let itemIcon = require("./../../../assets/android/baseline_settings_black_18dp.png");
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        // console.log('props', this.props);
        let items = this.props.user.safeBoxes.map((menuItem) => {
            return {
                name: menuItem.name,
                icon: (<AbstractIcon
                    source={itemIcon}
                    name={menuItem.icon.name}
                    size={16}
                    color={menuItem.icon.color} />),
                to: {native: menuItem.to.native, web: menuItem.to.web}
            }
        });
        const dataSource = ds.cloneWithRows(items);

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={dataSource}
                    renderRow={(data) => <CSBGridItem navigation={this.props.navigation} data={data} />}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});

const mapStateToProps = state => {
    return {
        user: state.global.user
    }
};

export default connect(mapStateToProps)(FrameLayoutContainer);