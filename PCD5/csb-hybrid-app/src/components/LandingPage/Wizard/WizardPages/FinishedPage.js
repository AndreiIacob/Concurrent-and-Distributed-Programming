import React from 'react';
import { Text, View } from 'react-native';

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const FinishedPage = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View style={style.centeredContainer}>
            <Text style={style.stepName}>Congratulations</Text>
            <Text style={style.tip}>You just set up your first Cloud Safe Box</Text>
        </View>
    );
};

export default FinishedPage;