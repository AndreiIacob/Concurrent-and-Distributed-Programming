import React from 'react';
import { View, StyleSheet } from 'react-native';

import Input from './Input';
import ActionButton from './ActionButton';

import { validateWithRegex, REGEX_CONFIG } from '../../../store/validators';

/**
 * @class AddBackupEntry
 * @param this.props.addEntry - The handler method used to add new backup entry in local storage
 */
export default class AddBackupEntry extends React.Component {
    state = {
        name: '',
        url: '',
        validUrl: true
    }

    resetFields = () => {
        this.setState({
            name: '',
            url: '',
            validUrl: true
        });
    }

    updateField = (field, value) => {
        this.setState({
            [field]: value
        });
    }

    generateUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    addEntryHandler = () => {
        const validUrl = validateWithRegex(this.state.url, REGEX_CONFIG.url);
        this.setState({
            validUrl: validUrl
        });

        if (!validUrl || this.state.name.trim().length === 0
            || this.state.url.trim().length === 0) {
            return;
        }

        const entry = {
            name: this.state.name,
            url: this.state.url,
            id: this.generateUID()
        }

        this.props.addEntry(entry);
        this.resetFields();
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.inputAreaWrapper}>
                    <Input
                        title={'Name'}
                        value={this.state.name}
                        updateField={value => this.updateField('name', value)} />
                    <Input
                        title={'URL'}
                        value={this.state.url}
                        inputValid={this.state.validUrl}
                        updateField={value => this.updateField('url', value)} />
                </View>
                <ActionButton
                    label='Add backup entry'
                    actionHandler={this.addEntryHandler} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    inputAreaWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
});