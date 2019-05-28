import React from 'react';
import { View, StyleSheet } from 'react-native';

import { csbActions } from '../../store/actions';

import CSBAction from './CSBAction';

export default class CSBActionContainer extends React.Component {
    render() {
        const CSBActions = csbActions.map(action => {
            return <CSBAction
                {...this.props}
                key={action.actionPathName}
                name={action.actionName}
                actionPathName={action.actionPathName}
                csbsPath={this.props.csbsPath}
                color={action.actionColor}
                textColor={action.actionTextColor}
                modalComponent = {action.modalComponent} />;
        });

        return (
            <View style={styleSheet.actionContainer}>
                {CSBActions}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    actionContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        flexWrap: 'wrap'
    }
});