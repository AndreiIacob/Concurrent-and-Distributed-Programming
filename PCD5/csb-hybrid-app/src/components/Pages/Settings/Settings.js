import React from 'react';

import Panel from "../../Panel/Panel";
import BackupContainer from '../../../container/DashboardSettings/BackupContainer';
import SeedContainer from '../../../container/DashboardSettings/SeedContainer';
import TabContainer from '../../../container/DashboardSettings/TabContainer';

import { getLocalStorageForNameAsJSON, updateLocalStorageForName, removeItemFromLocalStorage } from '../../../store/actions';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seed: '',
            backup: {},
            selectedTabIndex: 0
        }
    }

    componentDidMount() {
        this.loadDataFromBackup(['seed', 'backup']);
    }

    setDataFromLS = async type => {
        const value = await getLocalStorageForNameAsJSON('local-storage-' + type);
        if (value) {
            this.setState({
                [type]: value
            });
        }
    }

    loadDataFromBackup = args => {
        args.forEach(arg => {
            this.setDataFromLS(arg);
        });
    }

    updateLSForType = (type, newValue) => {
        updateLocalStorageForName('local-storage-' + type, newValue);
        this.setState({
            [type]: newValue
        });
    }

    addEntryInBackup = (type, entry, callback, remove) => {
        if (remove) {
            removeItemFromLocalStorage('local-storage-' + type, entry.id);
            const entries = { ...this.state.backup };
            delete entries[entry.id];
            this.setState({
                backup: entries
            });
        } else {
            const entries = { ...this.state.backup };
            entries[entry.id] = { ...entry };
            callback(type, entries);
        }
    }

    updateInputSeed = (type, value, callback) => {
        this.setState({
            seed: value
        });
        callback(type, value);
    };

    tabsHandler = (index) => {
        this.setState({
            selectedTabIndex: index
        });
    }

    render() {
        const tabsNamesList = [
            'Backup',
            'Recovery phrase'
        ];

        const tabsComponentsList = [
            <BackupContainer
                payload={this.state.backup}
                addEntry={(entry, remove) => this.addEntryInBackup('backup', entry, this.updateLSForType, remove)} />,
            <SeedContainer
                payload={this.state.seed}
                updateSeed={value => this.updateInputSeed('seed', value, this.updateLSForType)}
                saveSeed={seed => this.updateLSForType('seed', seed)}
                deleteSeed={() => this.updateLSForType('seed', '')} />
        ];

        return (
            <Panel breakpoint={this.props.breakpoint} name={'Settings'}>
                <TabContainer
                    tabsHandler={this.tabsHandler}
                    tabsNamesList={tabsNamesList}
                    selectedTabIndex={this.state.selectedTabIndex}>

                    {tabsComponentsList[this.state.selectedTabIndex]}

                </TabContainer>
            </Panel>
        );
    }
};