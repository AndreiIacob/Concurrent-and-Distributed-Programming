import React from 'react';
import { connect } from 'react-redux';
import { View, ListView, Text, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/dist/FontAwesome";

import Dashboard from "../Navigation/Dashboard/Dashboard";
import MenuItem from "../Menu/MenuItem/MenuItem";
import ProfileSummary from "../Profile/ProfileSummary/ProfileSummary";
import ExpandableMenu from "../Menu/ExpandableMenu/ExpandableMenu";

import StyleSheetFactory from '../../style/DashBoardStyle/StyleFactory';
import InteractionsManager from '../../services/InteractionsManager';
let InteractService = InteractionsManager.getInstance();
class Sidebar extends React.Component {
    state = {
        CSBsList: []
    }

    componentWillMount() {
        this.updateCSBs('');
    }


    createCSBSDetails = (csbs) => {
        const safeBoxesList = [];
        csbs.forEach((csb) => {
            safeBoxesList.push({
                name: csb,
                to: {
                    web: '/csb/' + csb,
                    native: 'CloudSafeBoxDetails'
                },
                icon: {
                    name: "lock",
                    color: "#d7163a"
                }
            });
        });
        return safeBoxesList;
    }

    updateCSBs = (csbsPath) => {
            InteractService.getCsbNames(csbsPath, (err, CSBsList) => {
                if (!err) {
                    let csbsDetailed = [];
                    if (CSBsList.csbs.length > 0) {
                        csbsDetailed = this.createCSBSDetails(CSBsList.csbs);
                    }

                    this.setState({
                        CSBsList: csbsDetailed
                    });
                } else {
                    console.err('Some error occured', err);
                }
            });

    }

    render() {
        const isDesktop = () => {
            return this.props.breakpoint === 'M'
                || this.props.breakpoint === 'L';
        }

        const displaySidebar = () => {
            return this.props.menuOpened
                || isDesktop(this.props);
        }

        const classes = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        const dashboardIcon = (<Icon name="home" size={24} color="#c5d1d8" />);

        const menuItems = [{
            name: "Create a new CSB",
            icon: (<Icon name="plus-square" size={20} color="#6fabca" />),
            to: { web: "/new-csb" }
        },
        {
            name: "Settings",
            icon: (<Icon name="gear" size={20} color="#6fabca" />),
            to: { web: "/settings" }
        },
        {
            name: "Backup",
            icon: (<Icon name="cloud" size={20} color="#6fabca" />),
            to: { web: "/backup" }
        }
        ];

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows(menuItems);

        const sideBarMenu = displaySidebar(this.props)
            ? (
                <View style={classes.sidebarOverlay}>
                    <View style={classes.sidebarWrapper}>
                        <Dashboard mobileMenuHandler={this.props.mobileMenuHandler}>
                            {dashboardIcon}
                        </Dashboard>

                        <ScrollView>
                            <ProfileSummary
                                name={this.props.user.name}
                                avatarType={this.props.user.profilePic}
                            />

                            <ExpandableMenu
                                mobileMenuHandler={this.props.mobileMenuHandler}
                                data={this.state.CSBsList}
                                title={this.state.CSBsList.length.toString() + " Cloud Safe Boxes"} />

                            <ListView
                                style={classes.sideBarMenuContainer}
                                dataSource={dataSource}
                                renderRow={(data) => <MenuItem data={data} mobileMenuHandler={this.props.mobileMenuHandler} />}
                            />
                        </ScrollView>

                        <Text style={classes.sideBarVersion}>Version: 0.1</Text>
                    </View>
                </View>
            )
            : (
                <View></View>
            );

        const burgerMenuContainer = isDesktop(this.props) ? null
            : (
                <View
                    style={[
                        classes.toggleMenuContainer,
                        this.props.menuOpened ? { left: -54 } : null
                    ]}
                    onClick={() => this.props.mobileMenuHandler(!this.props.menuOpened)}>
                    <Image
                        style={classes.menuIcon}
                        source={require('../../assets/android/hamburger-menu24.png')} />
                </View>
            );

        return (
            <View
                style={[
                    classes.sidebarContainer,
                    displaySidebar(this.props) ? null : { height: 55, backgroundColor: 'transparent' }
                ]}>
                {sideBarMenu}
                {isDesktop(this.props) ? null : (
                    <View
                        style={{
                            width: '20%',
                            height: 'calc(100% - 55px)',
                            alignSelf: 'flex-end'
                        }}
                        onClick={() => this.props.mobileMenuHandler(false)}></View>
                )}
                {burgerMenuContainer}
            </View>
        )
    }
};

const mapStateToProps = state => {
    return {
        user: state.global.user
    }
};

export default connect(mapStateToProps)(Sidebar);
