import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withRouter } from "react-router";

import StyleSheetFactory from '../../../style/DashBoardStyle/StyleFactory';

class Breadcrumb extends Component {

    state = {
        breadcrumbLocation: "Dashboard",
        oldBreadcrumbLocation: "Dashboard"
    };

    render() {
        const classes = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        const ChangeTracker = withRouter(({ match, location, history }) => {

            if (this.state.breadcrumbLocation !== location.pathname) {
                var currentLocation = this.state.breadcrumbLocation;
                this.setState({
                    breadcrumbLocation: location.pathname,
                    oldBreadcrumbLocation: currentLocation
                });
            }

            return false;
        });

        return (
            <View
                style={classes.breadcrumb}>
                <Text
                    style={classes.breadcrumbText}>
                    {this.state.breadcrumbLocation}
                </Text>
                <ChangeTracker />
            </View>
        );
    }
};
export default Breadcrumb;