import React from 'react';
import {Text, View} from 'react-native';

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";
import TextInputWithValidation from "../../../Validators/TextInputWithValidation/TextInputWithValidation";
import Validator from "../../../Validators/Validator";
import {validators} from "../../../../store/actions";

class NewCSB extends React.Component {


    constructor(props){
        super(props);

        this.validators = [
            Validator.fromDescription(validators.csb_name),
            Validator.setCustomValidator("This CSB name already exists!",(csbName)=>{
                return (this.props.existingCSBNames.indexOf(csbName) === -1);
            }),
            Validator.setCustomValidator("This CSB name is too long",(csbName)=>{
                return(csbName.length<=32)
            })
        ]
    }

    updateCSBName(csbName) {
        this.props.csbNameUpdateHandler(csbName);
        this.props.disableContinue(false);
    }

    render() {

        const style = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        return (
            <View style={style.centeredContainer}>
                <Text style={style.stepName}>What name should your CSB have?</Text>
                <Text style={style.tip}>
                    <Text style={{fontWeight: "bold"}}>Tip: </Text>
                    Enter a name you could easily remember. For example, Financial
                </Text>

                <TextInputWithValidation
                    validators={this.validators}
                    style={style.csbNameTextInput}
                    value={this.props.csbName}
                    onChangeText={(val) => this.updateCSBName(val)}
                    onValidationError={()=>this.props.disableContinue(true)}
                />


            </View>
        );
    };
};

export default NewCSB;