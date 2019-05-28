import React, { Component } from 'react';
import { View, DrawerLayoutAndroid, ToolbarAndroid, WebView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DrawerContainer from './DrawerContainer/DrawerContainer';
import FrameLayoutContainer from '../MobileContainer/FrameLayoutContainer/FrameLayoutContainer';
import InteractService from '../../services/InteractionsManager';
import CustomWebView from '../../services/CustomWebView';
import AppLoader from '../../components/LandingPage/OverlayLoader/AppLoader/AppLoader'
import FreshInstall from "../../components/LandingPage/OverlayLoader/FreshInstall/FreshInstall";

import {
    setAsFreshInstall,
    setLoadingState,
    isPartOfCsbCreation,
    updateBreakpoint,
    wizardPages,
    dashboardPages
} from "../../store/actions";

class MobileAppContainer extends Component {

    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.props.updateBreakpoint(width, height);
        Dimensions.addEventListener('change', this.resizeHandler);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resizeHandler);
    }

    resizeHandler = (dimensions) => {
        this.props.updateBreakpoint(dimensions.window.width, dimensions.window.height);
    };

    static navigationOptions = {
        header: null
    };

    openDrawer = () => {
        this.refs['myDrawer'].openDrawer();
    };

    closeDrawer = () => {
        this.refs['myDrawer'].closeDrawer();
    };

    onActionSelected = (position) => {
        if (position === 0) {
            console.log(position);
        }
    };

    webViewLoadEnd = () => {
        this.webView.postMessage('waitingForReactClient');
    };

    handleWebViewMessage = (event) => {

        if (event.nativeEvent && event.nativeEvent.data) {
            let message = JSON.parse(event.nativeEvent.data);
            if (message.type === "console.log") {
                console.log("WebView console: ", ...message.message);
                return;
            }
            else if (message.webViewIsReady === true) {
                console.log("WebView was initialized...");
                this.customWebView = new CustomWebView(this.webView);
                InteractService.newInstance(this.customWebView);
            }
            else if (message.reactClientCode) {
                console.log("loading reactClient from webView");
                eval(message.reactClientCode);
                console.log("reactClient loaded from webView");

                window.$$ = {
                    requireBundle: function () { },
                    CONSTANTS: {
                        SWARM_FOR_EXECUTION: "swarm_for_execution"
                    }
                };

                window.$$.PSK_PubSub = window.reactClientRequire("soundpubsub").soundPubSub;
                this.webView.postMessage('parentIsReady');
            } else {
                if (this.customWebView) {
                    this.customWebView.triggerEvent("message", { data: JSON.stringify(message) });
                }
            }
        }
    };

    componentWillMount() {

        let verifyIfFreshInstall = function (callback) {
            InteractService.getCsbNames('', (err, CSBsList) => {
                if(!err){
                    callback(CSBsList.length === 0)
                }
                else{
                    console.error("Some error occurred ",err);
                }
            });
        };

        verifyIfFreshInstall(async (isFreshInstall) => {
            this.props.setFreshInstall(isFreshInstall || await isPartOfCsbCreation('wizardPreferences'));
            this.props.setLoadingState(true);

            const { navigation } = this.props;
            if (isFreshInstal) {
                navigation.setParams({
                    pagesConfiguration: wizardPages,
                    preferences: 'wizardPreferences'
                });
            } else {
                navigation.setParams({
                    pagesConfiguration: dashboardPages,
                    preferences: 'dashboardPreferences'
                });
            }
            this.setState({
                navigation: navigation
            });
        });
    }

    render() {
        const { navigation } = this.props;
        var navigationView = <DrawerContainer navigation={navigation} user={this.props.user}
            closeHandler={this.closeDrawer} />;
        const CSB_APP_HTML = require('../../../public/apps/csb/csbWebView.html');


        let mobileDrawer = (<DrawerLayoutAndroid ref="myDrawer"
            renderNavigationView={() => navigationView}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

                <ToolbarAndroid
                    title="Cloud Safe Box"
                    titleColor="white"
                    onIconClicked={() => this.openDrawer()}
                    style={{ height: 56, backgroundColor: '#0095ff', alignSelf: 'stretch' }}
                    navIcon={require('./../../assets/android/hamburger-menu24.png')}
                    actions={[{
                        title: 'Settings',
                        icon: require('./../../assets/android/baseline_settings_black_18dp.png'),
                        show: 'always'
                    }]}
                    onActionSelected={this.onActionSelected}
                />

                <FrameLayoutContainer navigation={navigation} user={this.props.user} />
            </View>
        </DrawerLayoutAndroid>);

        return (

            <View style={{
                height: "100%",
                width: '100%',
                flex: 1
            }}>
                <View style={{ height: 0 }}>

                    <WebView
                        ref={(webView) => {
                            this.webView = webView;
                        }}

                        style={{ marginTop: 10 }}
                        originWhitelist={['*']}
                        source={CSB_APP_HTML}
                        domStorageEnabled={true}
                        onLoadEnd={this.webViewLoadEnd}
                        onError={(e) => {
                            console.warn('error occured', e)
                        }}

                        onMessage={this.handleWebViewMessage}
                        javaScriptEnabled={true}
                        startInLoadingState={true}

                    />
                </View>

                {this.props.isLoaded
                    ? (this.props.isFreshInstall
                        ? <FreshInstall navigation={navigation} breakpoint={this.props.breakpoint} />
                        : mobileDrawer)
                    : <AppLoader isLoaded={this.props.isLoaded} />}

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoaded: state.global.appReady,
        isFreshInstall: state.global.isFreshInstall,
        user: state.global.user,
        breakpoint: state.settings.breakpoint
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoadingState: (isLoading) => dispatch(setLoadingState(isLoading)),
        setFreshInstall: (isFresh) => dispatch(setAsFreshInstall(isFresh)),
        updateBreakpoint: (width, height) => dispatch(updateBreakpoint(width, height))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileAppContainer);
