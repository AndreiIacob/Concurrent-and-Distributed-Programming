import React from 'react';
import {Text, View} from 'react-native';

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";
import TextInputWithValidation from "../../../Validators/TextInputWithValidation/TextInputWithValidation";
import Validator from "../../../Validators/Validator";


class AddPin extends React.Component {

    constructor(props) {
        super(props);
        this.newPinValidators = [Validator.setCustomValidator("PIN is not secure", (pin) => {
            return pin.length >= 6
        })];

        this.checkPinValidators = [Validator.setCustomValidator("PINs do not match", (pin) => {
            return pin === this.state.newPin
        })];
    }

    state = {
        newPin: "",
        pinConfirmation: "",
    };

    updateNewPin(pin) {
        this.setState({
            newPin: pin
        }, () => {
            this.confirmationInput.validate(this.confirmationInput.state.currentInputValue);
            this.checkPins()
        });
    }

    updateConfirmedPin(confirmedPin) {
        this.setState({
            pinConfirmation: confirmedPin
        }, this.checkPins);
    }

    checkPins() {
        if (this.state.newPin === this.confirmationInput.state.currentInputValue) {
            this.props.disableContinue(false);
            this.props.setPin(this.state.newPin);
        }
    }


    render() {
        const style = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        return (
            <View style={style.centeredContainer}>
                <Text style={style.stepName}>{this.props.title}</Text>
                <Text style={style.tip}>This will help you to keep your device safe</Text>
                <View>
                    <TextInputWithValidation validators={this.newPinValidators}
                                             placeholder={"New Pin"}
                                             style={style.csbNameTextInput}
                                             onValidationError={() => this.props.disableContinue(true)}
                                             onChangeText={(val) => this.updateNewPin(val)}
                                             secureTextEntry={true}
                    />
                    <TextInputWithValidation validators={this.checkPinValidators}
                                             ref={(ref) => {
                                                 this.confirmationInput = ref
                                             }}
                                             placeholder={"Confirm Pin"}
                                             style={[style.csbNameTextInput]}
                                             onValidationError={() => this.props.disableContinue(true)}
                                             onChangeText={(val) => this.updateConfirmedPin(val)}
                                             secureTextEntry={true}
                    />

                </View>
            </View>


        );
    }
};

export default AddPin;
