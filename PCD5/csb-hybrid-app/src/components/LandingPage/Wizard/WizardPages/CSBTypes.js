import React from 'react';
import { Text, View } from 'react-native';

import { types } from '../../../../store/actions';

import CsbTypesContainer from './CsbTypeContainer';
import CsbTypeMobileContainer from './CsbTypeMobileContainer';

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const CSBTypes = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    let actionTypes = null;
    
    if (props.breakpoint === 'XS' || props.breakpoint === 'S') {
        actionTypes = types.map(csbType => {
            return <CsbTypeMobileContainer
                breakpoint={props.breakpoint}
                key={csbType.name}
                csbType={csbType}
                selected={props.selectedTypes[csbType.name] !== undefined}
                toggleCsbType={props.toogleTypeHandler}
            />
        });
    } else {
        actionTypes = types.map((csbType) => {
            return <CsbTypesContainer
                breakpoint={props.breakpoint}
                key={csbType.name}
                csbType={csbType}
                selected={props.selectedTypes[csbType.name] !== undefined}
                toogleTypeHandler={props.toogleTypeHandler}
            />
        });
    }

    return (
        <View style={style.centeredContainer}>
            <Text style={style.stepName}>What type should your CSB named <Text
                style={{ color: "green" }}>{props.csbName}</Text> store</Text>
            <Text style={style.tip}>
                <Text style={{ fontWeight: "bold" }}>Tip: </Text>
                You can select multiple CSBtypes</Text>

            <View style={style.typeContainer}>
                {actionTypes}
            </View>
        </View>
    );
};

export default CSBTypes;