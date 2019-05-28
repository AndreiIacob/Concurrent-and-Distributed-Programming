import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const ActionContainer = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View style={style.actionsContainer}>
            <TouchableOpacity
                style={[
                    style.continueButton,
                    props.hasOwnProperty('disabled') && props.disabled === true
                        ? style.disabledContinueButton : null
                ]}
                onPress={() => {
                    if (!props.hasOwnProperty('disabled') || props.disabled === false) {
                        props.handleClick();
                    }
                }} >
                <Text style={style.continueText}>{props.title.toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ActionContainer;