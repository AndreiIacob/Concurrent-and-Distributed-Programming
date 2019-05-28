import React from 'react';
import { View } from 'react-native';

import TitleText from '../../components/Pages/Settings/TitleText';
import BackupEntry from '../../components/Pages/Settings/BackupEntry';
import AddBackupEntry from '../../components/Pages/Settings/AddBackupEntry';

/**
 * @param {function} props.addEntry - The handler applyed to Add new entry button
 * @param {object} props.payload - An object that contains all the backups minimal information to be displayed ( entryKeyUID: {name: string, url: string} )
 */
const BackupContainer = (props) => {
    return (
        <View>
            <TitleText text={'Saved Backups - Every entry is stored in local storage after each change'} />

            <View>
                <Entries
                    keys={Object.keys(props.payload)}
                    payload={props.payload}
                    updateEntry={props.addEntry} />
            </View>

            <TitleText text={'Add new Backup'} />

            <AddBackupEntry addEntry={props.addEntry} />
        </View>
    );
};

export default BackupContainer;

/**
 * This function (stateless component) will be used only within BackupContainer component and it is used to render an array of components. No other file needed to be created.
 * 
 * @param {function} props.addEntry - The handler applyed to Add new entry button
 * @param {object} props.payload - An object that contains all the backups minimal information to be displayed ( entryKeyUID: {name: string, url: string} )
 * @param {array<UID>} props.keys - An array of UIDs representing the unique keys (UID) from props.payload
 */
const Entries = (props) => {
    if (props.keys.length === 0) {
        return <TitleText text={'For the moment, you do not have any backups saved.'} />
    }
    return (
        props.keys.map(entry => {
            return <BackupEntry
                key={entry}
                payload={props.payload[entry]}
                updateEntry={props.updateEntry} />;
        })
    );
}