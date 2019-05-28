import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import FirstAction from "./FirstAction/FirstAction";
import { updateBreakpoint } from '../../../../store/actions';

import StyleSheetFactory from './LandingPageStyleFactory/LandingPageStyleFactory';

class LandingPage extends React.Component {
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
    }

    render() {
        const styles = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        const width = Dimensions.get('window').width;

        return (
            <View style={styles.container}>
                <Text style={styles.welcomeMessage}>Welcome to your Cloud Safe Box</Text>
                <Text style={styles.guidelines}>If you are new here, we suggest you to follow the <Text
                    style={styles.guidelinesLink}>guidelines</Text> in order to successfully set-up your first <Text
                        style={styles.guidelinesLink}>CSB</Text></Text>
                <View style={styles.firstActionContainer}>
                    <FirstAction
                        navigation={this.props.navigation}
                        breakpoint={this.props.breakpoint}
                        data={{
                            icon: require('../../../../assets/global/images/restore_csb.png'),
                            hover: require('../../../../assets/global/images/restore_csb_hover.png'),
                            title: "Restore CSB",
                            width: width,
                            to: {
                                native: "NewCloudSafeBox",
                                web: "/restore"
                            }
                        }}>
                    </FirstAction>
                    <FirstAction
                        navigation={this.props.navigation}
                        breakpoint={this.props.breakpoint}
                        data={{
                            icon: require('../../../../assets/global/images/new_csb.png'),
                            hover: require('../../../../assets/global/images/new_csb_hover.png'),
                            title: "Init CSB",
                            width: width,
                            to: {
                                native: "Wizard",
                                web: "/wizard/new-csb"
                            }
                        }}>
                    </FirstAction>
                    <FirstAction
                        breakpoint={this.props.breakpoint}
                        data={{
                            icon: require('../../../../assets/global/images/csb_info.png'),
                            hover: require('../../../../assets/global/images/csb_info_hover.png'),
                            title: "New here?",
                            width: width,
                            to: {
                                native: "NewCloudSafeBox",
                                web: "/quick-start"
                            }
                        }}>
                    </FirstAction>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        breakpoint: state.settings.breakpoint
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBreakpoint: (width, height) => dispatch(updateBreakpoint(width, height))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);