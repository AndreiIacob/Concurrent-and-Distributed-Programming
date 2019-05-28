import React from 'react';
import {ScrollView, View, TextInput, Text, Image, Platform, WebView} from "react-native";
import LoaderWrapper from "../../../hoc/LoaderWrapper/LoaderWrapper";
import ActionContainer from "../Wizard/WizardPages/ActionContainer";
import StyleSheetFactory from "../Wizard/WizardStyleFactory/WizardStyleFactory";
import SimpleWrapper from "../../../hoc/SimpleWrapper";
import InteractionsManager from "../../../services/InteractionsManager";
import {setMasterCSBSeed, toggleSaveSeedConsent} from "../Wizard/store/actions";
import * as actions from "../../../store/actions";
import connect from "react-redux/es/connect/connect";
import TextInputWithValidation from "../../Validators/TextInputWithValidation/TextInputWithValidation";
import Validator from "../../Validators/Validator";
import {validators} from "../../../store/actions";
import {updateLocalStorageForName} from "../../../store/actions";
import queryString from 'query-string';

let InteractService = InteractionsManager.getInstance();

const stateNames = ["seed", "newCSBName", "completed"];

class RestoreCloudSafeBox extends React.PureComponent {


    constructor(props) {
        super(props);

        this.validators = [
            Validator.fromDescription(validators.csb_name),
            Validator.setCustomValidator("This CSB name is too long", (csbName) => {
                return (csbName.length <= 32)
            })];
        if (this.props.existingCSBNames) {
            this.validators.push(Validator.setCustomValidator("This CSB name already exists!", (csbName) => {
                return (this.props.existingCSBNames.indexOf(csbName) === -1);
            }))
        }

    }


    componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let queryParams = queryString.parse(this.props.location.search);
            if (queryParams['seed']) {
                this.setState({
                    seed: queryParams['seed'],
                    readOnly: true
                })
            }
        }
    }


    updateSeed(value) {
        this.setState({
            isContinueDisabled: false,
            seed: value
        })
    };

    state = {
        seed: "",
        newCsbName: "",
        isLoaded: true,
        currentState: stateNames[0],
        restoreCompleted: false,
        isContinueDisabled: false,
        readOnly: false
    };


    updateNewCSBName(value) {
        this.setState({
            isContinueDisabled: false,
            newCsbName: value
        })
    }

    handleButtonClick() {


        if (this.state.currentState === "completed") {

            if (this.props.onCompleted) {
                this.props.onCompleted();
            }
            else {
                this.props.setFreshInstall(false);
                this.props.toggleSaveSeedConsent();
                this.props.setMasterCSBSeed(this.state.seed);
                updateLocalStorageForName('local-storage-seed', this.state.seed);
                Platform.OS === "web"
                    ? this.props.history.push('/')
                    : this.props.navigation.navigate("MobileAppContainer");
            }

        }
        else {

            if (this.state.currentState === stateNames[0] && this.props.isAttach) {
                this.setState({
                    currentState: stateNames[1]
                });
            }
            else {

                this.setState({
                    isLoaded: false
                }, () => {
                    let csbPath = this.props.csbsPath;

                    if (this.props.isAttach) {
                        csbPath += "/" + this.state.newCsbName
                    }

                    if (!csbPath) {
                        csbPath = "";
                    }
                    InteractService.restoreCSB(csbPath, this.state.seed, (err) => {
                        if (err) {
                            this.setState({
                                isLoaded: true,
                                currentState: "seed",
                            }, () => this.seedInput.invalidateInput(err.message));

                        }
                        else {
                            this.setState({
                                isLoaded: true,
                                currentState: stateNames[2],
                                restoreCompleted: true
                            });
                        }
                    });
                })
            }
        }
        this.forceUpdate();
    }


    render() {
        const styleSheet = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        let seedInputView = null;
        switch (this.state.currentState) {
            case "seed":
                seedInputView = <SimpleWrapper>
                    <Text style={styleSheet.stepName}>Enter your recovery phrase or seed</Text>
                    <Text style={styleSheet.tip}>
                        <Text style={{fontWeight: "bold"}}>Tip: </Text>
                        You may have kept it in a secret place, possibly on a piece of paper.
                    </Text>


                    <TextInputWithValidation

                        ref={(seedInput) => {
                            this.seedInput = seedInput;
                        }}

                        editable={!this.state.readOnly}
                        style={[styleSheet.csbNameTextInput, this.state.readOnly ? {backgroundColor: 'rgba(0,0,0,0.075)'} : null]}
                        value={this.state.seed}
                        onValidationError={() => this.setState({isContinueDisabled: true})}
                        onChangeText={(val) => this.updateSeed(val)}
                    />


                </SimpleWrapper>;
                break;

            case "newCSBName":
                seedInputView = <SimpleWrapper>
                    <Text style={styleSheet.stepName}>New CSB name</Text>
                    <Text style={styleSheet.tip}>
                        <Text style={{fontWeight: "bold"}}>Tip: </Text>
                        Your restored data will be hold in a fresh new CSB
                    </Text>
                    <TextInputWithValidation

                        validators={this.validators}
                        style={styleSheet.csbNameTextInput}
                        value={this.state.newCsbName}
                        onValidationError={() => this.setState({isContinueDisabled: true})}
                        onChangeText={(val) => this.updateNewCSBName(val)}
                    />
                </SimpleWrapper>;
                break;

            case "completed":
                seedInputView =
                    <Text style={styleSheet.stepName}>Restore was successfully completed!</Text>
                break;

            default:
                break;
        }


        let currentPage = (<View style={styleSheet.centeredContainer}>
            <Image style={{width: 128, height: 128}} source={require('../../../assets/global/images/restore_csb.png')}/>
            {seedInputView}
        </View>);

        return (
            <View style={styleSheet.wizardContainer}>

                <LoaderWrapper isLoaded={this.state.isLoaded}>

                    {/* Content */}
                    <ScrollView
                        style={styleSheet.contentWrapper}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                        {currentPage}
                    </ScrollView>
                    {/* END Content */}

                    {/* Footer */}
                    <ActionContainer
                        breakpoint={this.props.breakpoint}
                        handleClick={() => this.handleButtonClick()}
                        disabled={this.state.isContinueDisabled}
                        title={this.state.restoreCompleted ? 'Finished' : "Continue"}/>
                    {/* END Footer */}

                </LoaderWrapper>

            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setMasterCSBSeed: (seed) => dispatch(setMasterCSBSeed(seed)),
        toggleSaveSeedConsent: () => dispatch(toggleSaveSeedConsent()),
        setFreshInstall: (isFresh) => dispatch(actions.setAsFreshInstall(isFresh)),
        updateBreakpoint: (width, height) => dispatch(actions.updateBreakpoint(width, height))
    }
};

export default connect(null, mapDispatchToProps)(RestoreCloudSafeBox);
