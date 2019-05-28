import React from 'react';
import { View } from 'react-native';

import StyleSheetFactory from '../../../style/DashBoardStyle/StyleFactory';

const rightContainer = (props) => {
    const classes = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View style={classes.mainContentContainer}>
            {props.children}
        </View>
    )
}
export default rightContainer;