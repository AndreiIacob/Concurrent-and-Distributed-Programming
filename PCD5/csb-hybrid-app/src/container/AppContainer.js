import React, {Component} from 'react';
import {Platform, View, Dimensions} from 'react-native';
import WebAppContainer from './WebContainer/WebAppContainer/WebAppContainer';
import AppLoader from '../components/LandingPage/OverlayLoader/AppLoader/AppLoader';
import FreshInstall from '../components/LandingPage/OverlayLoader/FreshInstall/FreshInstall';
import WebView from "WebView";
import {connect} from 'react-redux';
import {
    setLoadingState,
    setAsFreshInstall,
    isPartOfCsbCreation,
    updateBreakpoint,
    getCSBsList
} from "../store/actions";
import styles from './AppContainer.style';
import InteractionsManager, {subscribeModal} from "../services/InteractionsManager";
import Pin from '../components/Pin/Pin';
import PinManager from '../services/PinManager';
import UnauthorizedAccess from "../components/Pin/UnauthorizedAccess";

let InteractService = InteractionsManager.getInstance();

class AppContainer extends Component {

    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get('window');
        this.props.updateBreakpoint(width, height);
        Dimensions.addEventListener('change', this.resizeHandler);

        this.state = {
            pinModal: null,
            showPinModal:false
        };
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resizeHandler);
    }


    componentDidMount() {
        InteractService = InteractionsManager.getInstance(this.webView, "global");
        PinManager.setSubscriber((err, callback) => {

            if(err && err.type === "unauthorized_access"){
                this.setState({
                    unauthorizedAccess: true,
                    errorMessage:err.message
                });
            }
            else{
                this.pinCallback = callback;
                this.setState({
                    showPinModal: true,
                    pinErrMessage:err.message
                });
            }

        });
    }

    resizeHandler = (dimensions) => {
        this.props.updateBreakpoint(dimensions.window.width, dimensions.window.height);
    };

    componentWillMount() {

        let verifyIfFreshInstall = (callback) => {
            InteractService.getCsbNames('', (err, CSBsList) => {
                if (!err) {

                    if (CSBsList.csbs && CSBsList.csbs.length > 0) {
                        this.props.getRootCSBsList();
                    }
                    callback(CSBsList.length === 0)
                }
                else {
                    console.error("Some error occurred ", err);
                }
            });
        };

        var self = this;
        if (Platform.OS === "web") {
            window.global = window;
            window.$$ = {
                requireBundle: function () {
                },
                CONSTANTS: {
                    SWARM_FOR_EXECUTION: "swarm_for_execution"
                }
            };
            require("../../public/apps/csb/scripts/reactClient");
            window.$$.PSK_PubSub = window.reactClientRequire("soundpubsub").soundPubSub;
            console.log(window.$$);

            verifyIfFreshInstall(async (isFreshInstall) => {
                self.props.setFreshInstall(isFreshInstall || await isPartOfCsbCreation('wizardPreferences'));
                self.props.setLoadingState(true);
            });
        }
    }

    render() {
        let someView = this.props.isLoaded
            ? (this.props.isFreshInstall
                    ? <FreshInstall
                        breakpoint={this.props.breakpoint}
                        isLoaded={this.props.isLoaded}/>
                    : <WebAppContainer
                        safeBoxes={this.props.safeBoxes}
                        breakpoint={this.props.breakpoint}
                        isLoaded={this.props.isLoaded}/>
            )
            : null;

        const PinHolder = (props) => {
            if(this.state.unauthorizedAccess){
                return <UnauthorizedAccess errorMessage={this.state.errorMessage}/>
            }
            if (!this.state.showPinModal) {
                return null;
            } else {
                return (<Pin {...props} />);
            }
        };

        return (
            <View style={styles.wrapper}>
                <View style={{height: 0}}>
                    <WebView ref={(webView) => {
                        this.webView = webView;
                    }} source={{uri: require('../../public/apps/csb/csbTest.html')}}/>
                </View>
                {someView}
                <AppLoader isLoaded={this.props.isLoaded}/>
                <PinHolder pinErrMessage={this.state.pinErrMessage} submitPin={this.submitPin}/>
            </View>
        );
    }

    submitPin = (pin) => {
        this.pinCallback(pin);
        this.setState({showPinModal:false});
    }
}

const mapStateToProps = state => {
    return {
        isLoaded: state.global.appReady,
        isFreshInstall: state.global.isFreshInstall,
        breakpoint: state.settings.breakpoint,
        safeBoxes: state.global.user.safeBoxes,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoadingState: (isLoading) => dispatch(setLoadingState(isLoading)),
        setFreshInstall: (isFresh) => dispatch(setAsFreshInstall(isFresh)),
        updateBreakpoint: (width, height) => dispatch(updateBreakpoint(width, height)),
        getRootCSBsList: () => dispatch(getCSBsList("")),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
