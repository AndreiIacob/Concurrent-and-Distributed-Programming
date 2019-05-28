import React, {Component} from 'react';
import {View} from 'react-native';
import {Route, BrowserRouter} from 'react-router-dom';

import Sidebar from '../../../components/Sidebar/Sidebar';
import RightContainer from '../RightContainer/RightContainer';
import MainPanel from '../../../components/MainPanel/MainPanel';
import CSBDetailedItem from '../../../components/CSBDetailedItem/CSBDetailedItem';
import DashboardWizard from '../../../components/LandingPage/Wizard/DashboardWizard';
import RestoreCSB from '../../../components/Pages/RestoreCSB/RestoreCSB';

import {dashboardPages} from "../../../store/actions";
import StyleSheetFactory from '../../../style/DashBoardStyle/StyleFactory';
import Settings from "../../../components/Pages/Settings/Settings";
import Backup from "../../../components/Pages/Backup/Backup";

class WebAppContainer extends Component {

    state = {
        menuOpened: false // available only for mobile and tablet - portrait (< 900px)
    }

    mobileMenuHandler = (value) => {
        this.setState({
            menuOpened: value
        });
    }

    render() {
        const classes = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        return (
            <BrowserRouter>
                <View style={classes.appContainer}>
                    <View style={classes.appWrapper}>
                        <Sidebar
                            mobileMenuHandler={this.mobileMenuHandler}
                            breakpoint={this.props.breakpoint}
                            menuOpened={this.state.menuOpened}/>

                        <RightContainer
                            breakpoint={this.props.breakpoint}>

                            <Route
                                path="/" exact
                                render={(props) => <MainPanel
                                    {...props}
                                    breakpoint={this.props.breakpoint}
                                />}/>

                            <Route
                                path="/new-csb"
                                render={(props) => <DashboardWizard
                                    {...props}
                                    safeBoxes = {this.props.safeBoxes}
                                    isLoaded={this.props.isLoaded}
                                    breakpoint={this.props.breakpoint}
                                    pagesConfiguration={dashboardPages}
                                    preferences={'dashboardPreferences'}
                                />}/>

                            <Route
                                path="/restore-csb" exact
                                render={(props) => <RestoreCSB
                                    {...props}
                                    breakpoint={this.props.breakpoint}
                                />}/>


                            <Route
                                path="/backup" exact
                                render={(props) => <Backup
                                    {...props}
                                    breakpoint={this.props.breakpoint}
                                />}/>

                            <Route
                                path="/csb"
                                render={(props) => <CSBDetailedItem
                                    {...props}
                                    breakpoint={this.props.breakpoint}
                                />}
                            />

                            <Route
                                path="/settings"
                                render={(props) => <Settings
                                    {...props}
                                    breakpoint={this.props.breakpoint}
                                />}
                            />

                        </RightContainer>
                    </View>
                </View>
            </BrowserRouter>
        )
    }
}

export default WebAppContainer;
