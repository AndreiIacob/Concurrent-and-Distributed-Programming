import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import LandingPage from "./LandingPage";

import StyleSheetFactory from "./LandingPageStyleFactory/LandingPageStyleFactory";

export default class FreshInstall extends Component {

    render() {
        const styleSheet = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        return (
            <View style={styleSheet.overlay}>
                <ImageBackground
                    source={require("../../../../assets/global/images/background_init.jpg")}
                    style={styleSheet.image}>
                    <LandingPage navigation={this.props.navigation} />
                </ImageBackground>
            </View>
        );
    }
}