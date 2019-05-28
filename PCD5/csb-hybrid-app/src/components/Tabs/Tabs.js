import React from 'react';
import {StyleSheet, View} from "react-native";


export default class Tabs extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab
        };
    }

    activeTabChanged(_tab) {
        if (this.state.activeTab !== _tab) {
            this.setState({activeTab: _tab});
        }
    }

    render() {
        let children = this.props.children;
        var childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {
            activeTab: this.state.activeTab,
            tabChanged: (tab) => this.activeTabChanged(tab)
        }));


        return (<View style={{width: "100%", backgroundColor: "red"}}>{
            childrenWithProps
        }</View>)
    }
}
