import React from 'react';
import { View, StyleSheet } from 'react-native';

import Input from './Input';
import ActionButton from './ActionButton';

import { validateWithRegex, REGEX_CONFIG } from '../../../store/validators';

/**
 * @param {funcion} props.updateField - Handler triggered on each input change
 * @param {object} props.payload - An object that contains the information to be displayed ({name, url, id}). id is not displayed, it is the UID of each Entry
 */
export default class BackupEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.payload.name,
            url: this.props.payload.url,
            enableEdit: false,
            validUrl: true
        }
    }

    updateField = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    updateEntry = (remove) => {
        const entry = {
            name: this.state.name,
            url: this.state.url,
            id: this.props.payload.id
        };

        if (remove || (entry.name.trim().length === 0 && entry.url.trim().length === 0)) {
            this.props.updateEntry(entry, true);
            return;
        }

        const validUrl = validateWithRegex(entry.url, REGEX_CONFIG.url);
        this.setState({
            validUrl: validUrl,
            enableEdit: validUrl ? false : true
        });

        if (validUrl) {
            this.props.updateEntry(entry);
        }
    }

    toggleEditMode = value => {
        this.setState({
            enableEdit: value
        }, () => {
            if (!this.state.enableEdit) {
                this.updateEntry();
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <Input
                        title={'Name'}
                        value={this.state.name}
                        enableEdit={this.state.enableEdit}
                        updateField={value => this.updateField('name', value)} />
                    <Input
                        title={'URL'}
                        value={this.state.url}
                        enableEdit={this.state.enableEdit}
                        inputValid={this.state.validUrl}
                        updateField={value => this.updateField('url', value)} />
                </View>

                <View style={styles.actionWrapper}>
                    <ActionButton
                        label={this.state.enableEdit ? 'SAVE' : 'EDIT'}
                        backgroundColor={this.state.enableEdit ? '#00a86f' : '#2c7daf'}
                        actionHandler={() => {
                            this.toggleEditMode(!this.state.enableEdit);
                        }} />
                    <ActionButton
                        label={'DELETE'}
                        backgroundColor={'rgba(255,0,0,0.6)'}
                        actionHandler={() => {
                            this.updateEntry(true);
                        }} />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingBottom: 15
    },

    inputWrapper: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    actionWrapper: {
        flexDirection: 'row'
    }
});