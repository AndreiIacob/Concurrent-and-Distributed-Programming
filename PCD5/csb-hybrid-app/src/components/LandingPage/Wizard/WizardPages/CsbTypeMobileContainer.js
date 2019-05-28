import React from 'react';
import { View, Text, Image } from 'react-native';

import CheckBox from '../../../CheckBox/CheckBox';

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const CsbTypeMobileContainer = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View
            style={[
                style.csbTypeContainer,
                props.selected ? style.csbTypeContainerSelected : null
            ]}>
            <View
                style={style.csbRowContainer}
            >
                <Image source={props.csbType.icon} style={style.csbTypeIcon} />
                <Text style={style.csbTypeLabel}>
                    {props.csbType.name}
                </Text>

                <View style={style.csbCheckbox}>
                    <CheckBox
                        breakpoint={props.breakpoint}
                        checked={props.selected}
                        clickHandler={props.toggleCsbType}
                        handlerParam={props.csbType} />
                </View>
            </View>
        </View >
    );
}

export default CsbTypeMobileContainer;