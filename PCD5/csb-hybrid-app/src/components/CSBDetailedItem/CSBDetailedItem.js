import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import InteractionsManager from '../../services/InteractionsManager';

import CSBDetailHeader from './CSBDetailHeader';
import CSBActionContainer from './CSBActionContainer';
import CSBChildrenContainer from './CSBChildrenContainer';
import AssetModal from '../Modal/Popups/AssetModal';

import { csbActions } from '../../store/actions';
import StyleFactory from "../../style/DashBoardStyle/StyleFactory";
let InteractService = InteractionsManager.getInstance();
class CSBDetailedItem extends React.Component {
    state = {
        isLoaded: false,
        CSBsList: [],
        filesList: [],
        csbsPath: '',
        displayAssetModal: false,
        assetAlias: ''
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.updateCSBs(nextProps.location.pathname);
        }
    }

    componentWillMount() {
        this.updateCSBs(this.props.location.pathname);
    }

    getCSBPath = (path) => {
        path = path.replace('/csb/', '');
        csbActions.forEach(action => {
            path = path.replace(action.actionPathName, '');
        });
        return path;
    }

    createCSBSDetails = (csbs, csbsPath) => {
        const safeBoxesList = [];
        csbs.forEach((csb) => {
            safeBoxesList.push({
                name: csb,
                to: {
                    web: '/csb/' + csbsPath + '/' + csb,
                    native: 'CloudSafeBoxDetails'
                },
                icon: {
                    name: "lock",
                    color: "#d7163a"
                }
            });
        });
        return safeBoxesList;
    }

    createFilesDetails = (files, csbsPath) => {
        const filesList = [];
        files.forEach((file) => {
            filesList.push({
                name: file,
                type: 'asset',
                to: {
                    web: '/csb-assets/' + csbsPath + '/' + file,
                    native: 'CloudSafeBoxDetails'
                }
                // TODO: To check what info should have
            });
        });
        return filesList;
    }

    updateCSBs = (path) => {
        this.setState({ isLoaded: false });

        const csbsPath = this.getCSBPath(path);
        this.setState({
            csbsPath: csbsPath
        });

        InteractService.getCsbNames(csbsPath, (err, CSBsList) => {
            if (!err) {
                let csbsDetailed = [], filesDetailed = [];
                if (CSBsList.csbs.length > 0) {
                    csbsDetailed = this.createCSBSDetails(CSBsList.csbs, csbsPath);
                }
                if (CSBsList.files.length > 0) {
                    filesDetailed = this.createFilesDetails(CSBsList.files, csbsPath);
                }

                this.setState({
                    CSBsList: csbsDetailed,
                    filesList: filesDetailed,
                    isLoaded: true
                });
            } else {
                console.err('Some error occured', err);
            }
        });
    }

    displayAssetModal = (assetAlias) => {
        this.setState({
            displayAssetModal: true,
            assetAlias: assetAlias
        });
    }

    closeAssetModal = () => {
        this.setState({
            displayAssetModal: false
        });
    }

    render() {
        const visualPreferences = StyleFactory.getVisualPreferences(this.props.breakpoint);

        let assetModalComponent = null;
        if (this.state.displayAssetModal) {
            assetModalComponent = <AssetModal
                {...this.props}
                csbsPath={this.state.csbsPath}
                assetAlias={this.state.assetAlias}
                displayAssetModal={this.state.displayAssetModal}
                closeModal={() => this.closeAssetModal()} />;
        }

        return (
            <View style={style.itemContainer}>

                {/* Header - description / shared / alerts / ... */}
                <CSBDetailHeader
                    {...this.props}
                    csbsPath={this.state.csbsPath}
                />
                {/* End Header */}

                {/* Actions container - New / Attach File / Share / Receive / Assets / Delete */}
                <CSBActionContainer
                    safeBoxes = {this.state.CSBsList}
                    {...this.props}
                    reload={() => {
                        this.updateCSBs(this.state.csbsPath)
                    }}
                    csbsPath={this.state.csbsPath}
                />
                {/* End Actions container */}

                {/* Chidldren CSBs will be displayed here */}
                <ScrollView
                    style={style.item}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <CSBChildrenContainer
                        {...this.props}
                        csbsPerPage={visualPreferences.COLUMN_NUMBER_FOR_DASHBOARD_LISTED_CSBS}
                        safeBoxes={this.state.CSBsList}
                        files={this.state.filesList}
                        isLoaded={this.state.isLoaded}
                        assetOpenModal={(assetAlias) => this.displayAssetModal(assetAlias)}
                    />

                    {assetModalComponent}
                </ScrollView>
                {/* End Chidlren */}
            </View>
        );
    }
};

export default CSBDetailedItem;

const style = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },

    item: {
        flexDirection: 'column',
        height: "100%",
        width: '100%',
        zIndex: -2
    },

    textFormat: {
        fontWeight: '500',
        fontSize: 16
    },

    csbImage: {
        width: 125,
        height: 125,
        marginBottom: 30,
        marginTop: 20
    },

    itemInvisible: {
        backgroundColor: 'transparent',
    }
});
