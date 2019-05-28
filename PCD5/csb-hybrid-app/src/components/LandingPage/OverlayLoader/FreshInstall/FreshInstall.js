import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import LandingPage from "./LandingPage";
import Wizard from "../../Wizard/Wizard";
import {wizardPages} from '../../../../store/actions';

import StyleSheetFactory from "./LandingPageStyleFactory/LandingPageStyleFactory";
import RestoreCloudSafeBox from "../../Restore/RestoreCloudSafeBox";
import QuickStart from "../../QuickStart/QuickStart";

export default class FreshInstall extends Component {
    render() {
        const styleSheet = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        return (
            <BrowserRouter>
                <View style={styleSheet.overlay}>
                    <ImageBackground
                        source={require("../../../../assets/global/images/background_init.jpg")}
                        style={styleSheet.image}>
                        <Switch>
                            <Route
                                path="/wizard" exact
                                component={LandingPage}/>
                            <Route
                                path="/wizard/new-csb"
                                render={(props) => <View style={styleSheet.container}><Wizard
                                    {...props}
                                    isLoaded={this.props.isLoaded}
                                    pagesConfiguration={wizardPages}
                                    preferences={'wizardPreferences'}
                                /></View>
                                }/>
                            <Route
                                render={(props) => <View style={styleSheet.container}>
                                    <RestoreCloudSafeBox {...props}/>
                                </View>}
                                path="/restore"
                            />
                            <Route
                                path="/quick-start"
                                render={(props) => <View style={styleSheet.container}>
                                    <QuickStart {...props}/>
                                </View>}/>
                            <Redirect from="/" to="/wizard"/>
                        </Switch>
                    </ImageBackground>
                </View>
            </BrowserRouter>
        );
    }
}