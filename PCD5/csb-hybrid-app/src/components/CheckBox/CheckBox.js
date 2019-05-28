import React from 'react';
import { Image, View, Platform } from 'react-native';

import { checkbox } from '../../store/actions';
import StyleSheetFactory from "../LandingPage/Wizard/WizardStyleFactory/WizardStyleFactory";

const CheckBox = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View onClick={() => props.clickHandler(props.handlerParam)}
            onTouchEnd={() => {
                if (Platform.OS !== 'web') {
                    props.clickHandler(props.handlerParam)
                }
            }}>
            <Image
                source={props.checked ? checkbox.checked : checkbox.unchecked}
                style={style.checkbox} />
        </View>
    );
};

export default CheckBox;