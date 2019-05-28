import React from 'react';
import { View, StyleSheet } from 'react-native';

import DetailTab from './DetailTab';

export default class CSBDetailHeader extends React.Component {
    render() {
        return (
            <View style={styleSheet.headerContainer}>
                <View style={styleSheet.headerSecondaryContainer}>
                    <DetailTab
                        {...this.props}
                        url={this.props.csbsPath} />
                </View>
                {/* <View style={styleSheet.headerSecondaryContainer}>
                    <DetailTab
                        {...this.props}
                        tabName={this.props.csbsPath} />
                    <DetailTab
                        {...this.props}
                        tabName='Shared'
                        detailValue={5} />
                    <DetailTab
                        {...this.props}
                        tabName='Alerts'
                        detailValue={10} />
                </View> */}
            </View >
        );
    }
}

const styleSheet = StyleSheet.create({
    headerContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#3d3d3d'
    },

    headerSecondaryContainer: {
        width: '100%',
        height: 55,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#3d3d3d'
    }
});