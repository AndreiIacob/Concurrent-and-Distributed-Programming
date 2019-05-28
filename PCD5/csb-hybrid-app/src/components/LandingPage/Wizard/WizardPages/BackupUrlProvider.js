import React from 'react';
import {View, Text, TextInput} from 'react-native';
import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

const BackupUrlProvider = (props) => {
    const style = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (<View style={style.centeredContainer}>
        <Text style={style.stepName}>Where should your CSB should be backed up?</Text>
        <Text style={style.tip}>
            <Text style={{fontWeight: "bold"}}>Tip: </Text>
            If you do not know for sure, leave it as it is
        </Text>
        <TextInput
            style={style.csbNameTextInput}
            value={props.backupUrl}
            onChangeText={props.setBackupUrl}
        />
    </View>)
};

export default BackupUrlProvider;
