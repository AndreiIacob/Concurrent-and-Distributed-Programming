import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * @param {function} props.tabsHandler - The handler attached to each tab in order to display it's content
 * @param {array<string>} props.tabsNamesList - An array of strings which contains the names of each tab
 * @param {integer} props.selectedTabIndex - The index of the selected tab - special design for active tab
 */
const TabContainer = (props) => {
    return (
        <View style={styleSheet.tabContainerWrapper}>
            <TabHeader {...props} />

            <ScrollView style={styleSheet.tabContentWrapper}>
                {props.children}
            </ScrollView>
        </View>
    );
};

/**
 * This function (stateless component) will be used only within TabContainer component and it is used to render an array of components. No other file needed to be created.
 * 
 * @param {function} props.tabsHandler - Inherit from TabContainer component
 * @param {array<string>} props.tabsNamesList - Inherit from TabContainer component
 * @param {integer} props.selectedTabIndex - Inherit from TabContainer component
 */
const TabHeader = (props) => {
    return (
        <View style={styleSheet.tabHeader}>
            <View style={styleSheet.emptyTab}></View>
            <View style={styleSheet.tabWrapper}>
                {props.tabsNamesList.map((name, index) => {
                    return <TabItem
                        key={name}
                        label={name}
                        index={index}
                        selected={index === props.selectedTabIndex}
                        tabsHandler={props.tabsHandler} />
                })}
            </View>
            <View style={styleSheet.emptyTab}></View>
        </View>
    );
};

/**
 * This function (stateless component) will be used only within TabHeader component and it is used to render an array of components. No other file needed to be created.
 * 
 * @param {boolean} props.selected - Sent from TabHeader component - The state of the tab (if is active or not)
 * @param {string} props.label - Sent from TabHeader component - The label of the tab
 * @param {integer} props.index - Sent from TabHeader component - The index of the tab
 */
const TabItem = (props) => {
    return (
        <TouchableOpacity
            style={[styleSheet.tab, props.selected ? styleSheet.tabSelected : null]}
            onPressOut={() => {
                if (!props.selected) {
                    props.tabsHandler(props.index);
                }
            }}>
            <View>
                <Text style={[styleSheet.tabText, props.selected ? styleSheet.tabTextSelected : null]}>
                    {props.label}
                </Text>
            </View>
        </TouchableOpacity >
    );
};

export default TabContainer;

const styleSheet = StyleSheet.create({
    tabContainerWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    tabContentWrapper: {
        height: '100%',
        width: '100%',
        paddingBottom: 40
    },

    tabHeader: {
        flexDirection: 'row',
        width: '100%',
        borderColor: 'rgba(0,0,0,0.2)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },

    tabWrapper: {
        flexDirection: 'row',
        flex: 1
    },

    emptyTab: {
        width: 56,
        flexShrink: 0
    },

    tab: {
        minHeight: 42,
        minWidth: 100,
        maxWidth: 264,
        overflow: 'hidden',
    },

    tabSelected: {
        borderBottomWidth: 2,
        borderColor: '#2196f3'
    },

    tabText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        flexShrink: 0,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },

    tabTextSelected: {
        color: '#2196f3'
    }
});