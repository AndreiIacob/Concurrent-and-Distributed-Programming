import React from 'react';
import { View, Text } from 'react-native';

import StyleSheetFactory from './WizardBarStyleFactory/WizardBarStyleFactory';

const WizardStep = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    let isCurrentWrapper = null;

    if (props.isCurrent === "true") {
        isCurrentWrapper = (
            <View style={style.isCurrent}></View>
        );
    }

    let stepStylesArray = [];
    let wizardStepTextStyle = null;

    if (props.breakpoint === 'M' || props.breakpoint === 'L') {
        stepStylesArray.push(style.wizardStep);
        wizardStepTextStyle = style.wizardStepText;
    } else {
        const stepTypeDesign = isCurrentWrapper !== null
            ? style.wizardStep
            : style.wizardSmallStep
        wizardStepTextStyle = isCurrentWrapper !== null
            ? style.wizardStepText
            : style.wizardStepTextSmall;
        stepStylesArray.push(stepTypeDesign);
    }

    if (props.isCompleted === 'true') {
        stepStylesArray.push(style.stepCompleted);
    } else {
        if (isCurrentWrapper !== null) {
            stepStylesArray.push(style.stepCurrent);
        } else {
            stepStylesArray.push(style.stepUncompleted);
        }
    }

    const progressBar = props.breakpoint === 'M' || props.breakpoint === 'L'
        ? (
            <View style={[
                style.grayLine,
                style["line-" + props.stepType],
                props.isCompleted === "true" || isCurrentWrapper
                    ? style.stepCompleted
                    : style.stepUncompleted
            ]}></View>
        )
        : null;

    return (
        <View style={{ width: "100%", alignItems: props.stepType }}>
            <View>
                <View
                    style={stepStylesArray}>
                    <Text style={wizardStepTextStyle}>{props.step}</Text>
                </View>
                {isCurrentWrapper}
            </View>

            {progressBar}
        </View>
    );
};

export default WizardStep;