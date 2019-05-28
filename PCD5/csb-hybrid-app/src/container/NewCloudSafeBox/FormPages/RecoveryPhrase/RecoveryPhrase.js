import React from 'react';
import {View, Text,ListView} from 'react-native';
import classes from './RecoveryPhrase.style.js';

const recovery_phrase = (props) =>{

    let recoveryPhraseWords = ["witch", "collapse", "practice", "feed", "shame", "open", "despair", "creek", "road", "again", "ice", "least", "milk"];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(recoveryPhraseWords);


return (
    <View>
        <Text>Please write it down on a paper and kepp it in a safe place as you would with paper money.</Text>
        <Text>If you lose your recovery phrase, your CSB cannot be recovered</Text>
        <View style={classes.RecoveryPhraseContainer}>
            <ListView contentContainerStyle={classes.RecoveryPhrase}
                dataSource={dataSource}
                renderRow={(rowData) => <View style={classes.RecoveryWord}><Text>{rowData}</Text></View>}
            />
        </View>
    </View>
)

};

export default recovery_phrase;

