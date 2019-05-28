import React from 'react';
import {Text, TextInput} from 'react-native';
import SimpleWrapper from "../../../hoc/SimpleWrapper";

class TextInputWithValidation extends React.Component {

    state = {
        validationError: false,
        currentInputValue:""
    };

    invalidateInput(message) {
        this.setState({validationError: message});
        if (this.props.onValidationError) {
            this.props.onValidationError();
        }
    }

    validate(val) {
        this.setState({currentInputValue: val});
        let validationErrors = 0;
        if (this.props.validators) {
            for (let i = 0; i < this.props.validators.length; i++) {
                let validator = this.props.validators[i];
                if (validator.validate(val) === false) {
                    this.setState({
                        validationError: validator.message
                    });
                    this.props.onValidationError();
                    validationErrors++;
                    break;
                }
            }
        }
        if (validationErrors === 0) {
            this.props.onChangeText(val);
            this.setState({
                validationError: false
            });
        }
    }

    render() {
        let validationMessage = this.state.validationError ?
            <Text style={{color: "red"}}>{this.state.validationError}</Text> : null;
        return (
            <SimpleWrapper>
                <TextInput
                    secureTextEntry={this.props.hasOwnProperty("secureTextEntry")}
                    placeholder={this.props.hasOwnProperty("placeholder") ? this.props.placeholder:""}
                    editable={this.props.hasOwnProperty("editable") ? this.props.editable : true}
                    style={[this.props.style, this.state.validationError ? {borderColor: "red"} : null]}
                    value={this.props.value}
                    onChangeText={(val) => this.validate(val)}
                />
                {validationMessage}

            </SimpleWrapper>
        )
    }
}

export default TextInputWithValidation;
