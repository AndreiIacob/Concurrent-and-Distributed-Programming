import React from 'react';
import { View, Dimensions, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { setMasterCSBSeed, toggleSaveSeedConsent } from "./store/actions";
import InteractionsManager from "../../../services/InteractionsManager";

import NewCSB from "./WizardPages/NewCSB";
import CSBTypes from "./WizardPages/CSBTypes";
import RecoveryPhrase from "./WizardPages/RecoveryPhrase";
import FinishedPage from "./WizardPages/FinishedPage";
import WizardProgressBar from './WizardProgressBar/WizardProgressBar';
import ActionContainer from './WizardPages/ActionContainer';

import LoaderWrapper from '../../../hoc/LoaderWrapper/LoaderWrapper';

import StyleSheetFactory from './WizardStyleFactory/WizardStyleFactory';
import BackupUrlProvider from "./WizardPages/BackupUrlProvider";
import AddPin from "./WizardPages/AddPin";
let InteractService = InteractionsManager.getInstance();

class Wizard extends React.Component {
    state = {
        csbName: "",
        csbTypes: {},
        pin:"",
        currentPage: null,
        pagesConfiguration: null,
        preferences: null,
        isLoaded: false,
        continueIsDisabled: false,
        backupUrl: "https://backup.privatesky.ro"
    };

    constructor(props) {
        super(props);
        this.state.isLoaded = this.props.isLoaded;
        const { width, height } = Dimensions.get('window');
        this.props.updateBreakpoint(width, height);
        Dimensions.addEventListener('change', this.resizeHandler);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resizeHandler);
    }

    resizeHandler = (dimensions) => {
        this.props.updateBreakpoint(dimensions.window.width, dimensions.window.height);
    }

    // TODO: To check and refactor the declaration of componentWillMount
    // To find a better way of handling the async methods and to remove async from this function
    async componentWillMount() {

        InteractService = InteractionsManager.getInstance();
        const { pagesConfiguration, preferences } = this.getPageConfiguration();
        const currentPage = pagesConfiguration[0];

        this.setState({
            pagesConfiguration: pagesConfiguration,
            currentPage: currentPage,
            preferences: preferences
        });

        const localStoragePreferences = await actions.getLocalStorageForNameAsJSON(preferences);
        const stateProperties = localStoragePreferences !== null && await actions.isPartOfCsbCreation(preferences)
            ? { ...localStoragePreferences.setup }
            : this.state;

        this.setState({
            ...stateProperties
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.currentPage.pageIndex !== this.props.pagesConfiguration.length - 1) {
            actions.updateLocalStorageForName(this.state.preferences, {
                'completed': false,
                'setup': { ...nextState }
            });
        } else {
            actions.updateLocalStorageForName(this.state.preferences, {
                'completed': true
            });
        }
    }

    getPageConfiguration() {
        return {
            pagesConfiguration: this.props.pagesConfiguration
                ? this.props.pagesConfiguration
                : (this.props.navigation
                    ? this.props.navigation.getParam('pagesConfiguration', actions.wizardPages)
                    : actions.wizardPages),
            preferences: this.props.preferences
                ? this.props.preferences
                : (this.props.navigation
                    ? this.props.navigation.getParam('preferences', 'wizardPreferences')
                    : 'wizardPreferences')
        }
    }

    csbNameUpdateHandler(name) {
        this.setState({
            csbName: name
        })
    }

    setPinHandler(pin){
        this.setState({pin: pin})
    }
    changeDefaultPin(){
        this.updatePageState(() => {
            this.setLoadingState(false);
            InteractService.changeDefaultPin(this.state.pin,()=>{
                this.setLoadingState(true);
            });
        });
    }

    setBackupUrl(backupUrl) {
        this.setState({
            backupUrl: backupUrl
        })
    }

    toggleWizardTypes = type => {
        let csbTypes = this.state.csbTypes;

        if (csbTypes[type.name]) {
            delete csbTypes[type.name];
        }
        else {
            csbTypes[type.name] = type;
        }
        this.setState({
            csbTypes: csbTypes
        });
    }

    toggleDashboardType = type => {
        let csbTypes = {};
        csbTypes[type.name] = type;

        this.setState({
            csbTypes: csbTypes,
            csbTypeName: type.name
        });
    }

    toggleType(type) {
        this.state.currentPage.singleChoice
            ? this.toggleDashboardType(type)
            : this.toggleWizardTypes(type);
    }

    updatePageState = (callback) => {

        if (this.state.currentPage.pageIndex !== this.props.pagesConfiguration.length - 1) {
            this.setState({
                currentPage: this.state.pagesConfiguration[this.state.currentPage.pageIndex + 1],
            }, callback);
        }
        else {
            let sequence = callback();
            if (sequence) {
                sequence.then(() => {
                    this.wizardWasFinished();
                })
            }

        }

    };

    setLoadingState = (value) => {
        this.setState({
            isLoaded: value
        });
    };

    resolverToManifest = (resolve, csbName, csbType) => {
        var manifest = {
            name: csbName,
            type: csbType
        };
        InteractService.saveCsbManifest(csbName, manifest, () => {
            resolve();
        });
    };


    createCSB(csbsPath) {

        this.updatePageState(() => {
            this.setLoadingState(false);

            let backupsUrl = this.state.backupUrl;
            InteractService.createCSB(csbsPath, backupsUrl, (err, isMaster, seed) => {
                if (!err) {
                    if (isMaster === true) {
                        this.props.setMasterCSBSeed(seed);
                    }
                    else {
                        this.setLoadingState(true);
                    }
                }
            });
        });
    }

    selectCSBTypes(csbsPath) {

        this.updatePageState(() => {
            this.setLoadingState(false);
            let sequence = Promise.resolve();
            if (this.state.currentPage.singleChoice) {
                sequence = sequence.then(() => {
                    return new Promise(resolve => {
                        this.resolverToManifest(resolve, csbsPath, this.state.csbTypes[this.state.csbTypeName]);
                    });
                });
            } else {
                Object.keys(this.state.csbTypes).forEach((csbType) => {
                    sequence = sequence.then(() => {
                        return new Promise((resolve) => {
                            let csbTypeName = "My" + csbType + "Data";
                            InteractService.createCSB(csbTypeName, () => {
                                this.resolverToManifest(resolve, csbTypeName, this.state.csbTypes[csbType]);
                            });
                        });
                    });
                });
            }

            sequence = sequence.then(() => {
                this.setLoadingState(true);
            });

            return sequence;
        });
    }

    recoveryPhraseHandler() {
        this.updatePageState(() => {
            if (this.props.saveSeed) {
                //TODO add this action in global actions
                actions.updateLocalStorageForName('local-storage-seed', this.props.seed);
            }
        });
    }

    wizardWasFinished() {
        this.props.setFreshInstall(false);
        //TODO add this action in global actions
        actions.updateLocalStorageForName('local-storage-backup', { 0: { id: 0, name: "default", url: this.state.backupUrl } });
        if (this.props.closeModal) {
            this.props.closeModal();
            this.props.history.push(this.props.location.pathname);
        } else {
            Platform.OS === "web"
                ? this.props.history.push('/')
                : this.props.navigation.navigate("MobileAppContainer");
        }
    }

    handleButtonClick() {
        let csbsPath = this.state.csbName;
        if (this.props.csbsPath) {
            csbsPath = this.props.csbsPath + '/' + csbsPath;
        }

        if (this.state.currentPage.pageIndex !== this.props.pagesConfiguration.length) {
            switch (this.state.currentPage.pageName) {
                case 'name':
                    //createCSB
                    this.createCSB(csbsPath);
                    break;

                case "backup":
                    this.createCSB(csbsPath);
                    break;

                case 'type':
                    //add csb types
                    this.selectCSBTypes(csbsPath);
                    break;

                case 'seed':
                    this.recoveryPhraseHandler();
                    break;
                case 'pin':
                    this.changeDefaultPin();
                    break;
                case 'finish':
                    this.wizardWasFinished();
                    break;
                default:
                    break;
            }
        }
        else {
            this.wizardWasFinished();
        }
    }

    getCurrentPage = () => {
        switch (this.state.currentPage.pageName) {
            case "backup":
                return (<BackupUrlProvider
                    breakpoint={this.props.breakpoint}
                    backupUrl={this.state.backupUrl}
                    setBackupUrl={(value) => this.setBackupUrl(value)}
                />);

            case "name":
                return (<NewCSB
                    breakpoint={this.props.breakpoint}
                    csbName={this.state.csbName}
                    existingCSBNames={this.props.safeBoxes.map(safeBox => {
                        return safeBox.name;
                    })}
                    disableContinue={(value) => this.setContinueDisabled(value)}
                    csbNameUpdateHandler={(value) => this.csbNameUpdateHandler(value)}
                />);
            case "type":
                return (<CSBTypes
                    breakpoint={this.props.breakpoint}
                    csbName={this.state.csbName}
                    selectedTypes={this.state.csbTypes}
                    toogleTypeHandler={(type) => this.toggleType(type)}
                />);
            case "seed":
                return (<RecoveryPhrase
                    breakpoint={this.props.breakpoint}
                    seed={this.props.seed}
                    saveSeed={this.props.saveSeed}
                    toggleSaveSeedConsent={() => this.props.toggleSaveSeedConsent()}
                />);
            case "pin":
                return (<AddPin
                    title = {"Add a PIN"}
                    breakpoint={this.props.breakpoint}
                    setPin = {(pin)=>{this.setPinHandler(pin)}}
                    disableContinue={(value) => this.setContinueDisabled(value)}
                />);
            case "finish":
                return (<FinishedPage
                    breakpoint={this.props.breakpoint}
                    csbName={this.state.csbName}
                />);
            default:
                return null;
        }
    }

    setContinueDisabled(value) {
        this.setState({
            continueIsDisabled: value
        })
    }

    isContinueDisabled() {
        return (this.state.currentPage.pageName === 'type'
            && Object.keys(this.state.csbTypes).length === 0) || this.state.continueIsDisabled;
    }

    render() {
        if (this.state.currentPage == null) return null;

        let currentPage = this.getCurrentPage();

        const styleSheet = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        return (
            <View style={styleSheet.wizardContainer}>

                <LoaderWrapper isLoaded={this.state.isLoaded}>

                    {/* Header */}
                    <WizardProgressBar pages={this.state.pagesConfiguration} currentPage={this.state.currentPage} />
                    {/* END Header */}

                    {/* Content */}
                    <ScrollView
                        style={styleSheet.contentWrapper}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        {currentPage}
                    </ScrollView>
                    {/* END Content */}

                    {/* Footer */}
                    <ActionContainer
                        breakpoint={this.props.breakpoint}
                        handleClick={() => this.handleButtonClick()}
                        disabled={this.isContinueDisabled()}
                        title={this.state.currentPage.pageIndex === this.props.pagesConfiguration.length - 1 ? 'Finished' : 'Continue'} />
                    {/* END Footer */}

                </LoaderWrapper>

            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        seed: state.wizard.seed,
        saveSeed: state.wizard.saveSeed,
        breakpoint: state.settings.breakpoint
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMasterCSBSeed: (seed) => dispatch(setMasterCSBSeed(seed)),
        toggleSaveSeedConsent: () => dispatch(toggleSaveSeedConsent()),
        setFreshInstall: (isFresh) => dispatch(actions.setAsFreshInstall(isFresh)),
        updateBreakpoint: (width, height) => dispatch(actions.updateBreakpoint(width, height)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
