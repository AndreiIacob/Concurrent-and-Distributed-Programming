import React from 'react';
import { ListView, Text, View } from 'react-native';

import CheckBox from '../../../CheckBox/CheckBox';
import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const RecoveryPhrase = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    let words = [props.seed];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    let dataSource = ds.cloneWithRows(words);

    return (
        <View style={style.centeredContainer}>
            <View style={style.flexEndContainer}>
                <Text style={style.stepName}>Recovery phrase</Text>
                <Text style={style.tip}>Please note the following recovery phrase on a piece of paper and keep it safely</Text>
            </View>

            <View style={style.recoveryPhraseContainer}>
                <ListView contentContainerStyle={style.recoveryPhrase}
                    dataSource={dataSource}
                    renderRow={(rowData) => {
                        return (
                            <View style={style.recoveryWord}>
                                <Text>{rowData}</Text>
                            </View>
                        );
                    }
                    } />
            </View>

            <View style={style.keepSeedConsent}>
                <CheckBox
                    style={style.checkbox}
                    checked={props.saveSeed}
                    clickHandler={props.toggleSaveSeedConsent} />
                <Text>Save recovery phrase until I'll opt out</Text>
            </View>
        </View>
    );
};

export default RecoveryPhrase;