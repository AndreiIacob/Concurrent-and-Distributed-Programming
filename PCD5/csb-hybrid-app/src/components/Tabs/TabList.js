import React from 'react';
import {StyleSheet, View} from "react-native";

export default class TabList extends React.Component {


    render() {
        let children = this.props.children;
        var childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {
            activeTab: this.props.activeTab,
            tabChanged: (tabFor) => this.props.tabChanged(tabFor)
        }));

        return (<View style={style.tabsContainer}>
            {childrenWithProps}

        </View>)
    }
}
const style = StyleSheet.create({
    tabsContainer: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        height: 48
    }
});
