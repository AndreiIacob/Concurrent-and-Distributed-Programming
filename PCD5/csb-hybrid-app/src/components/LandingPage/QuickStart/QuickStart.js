import React from 'react';
import {Platform, View} from "react-native";
import ActionContainer from "../Wizard/WizardPages/ActionContainer";
import StyleSheetFactory from "../Wizard/WizardStyleFactory/WizardStyleFactory";
import QuickStartText from "./QuickStartText";
import Scrollbar from "react-scrollbars-custom";


export default class QuickStart extends React.PureComponent {


    handleButtonClick() {
        Platform.OS === "web"
            ? this.props.history.push('/')
            : this.props.navigation.navigate("MobileAppContainer");
    }

    render() {
        const styleSheet = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        return (
            <View style={styleSheet.wizardContainer}>

                {/* Content */}
                <Scrollbar
                    style={{width: "100%", height: "100%"}}>
                    <QuickStartText/>
                </Scrollbar>
                {/* END Content */}

                {/* Footer */}
                <ActionContainer
                    breakpoint={this.props.breakpoint}
                    handleClick={() => this.handleButtonClick()}
                    title={"Let's create my first CSB"}/>
                {/* END Footer */}

            </View>
        )
    }
}