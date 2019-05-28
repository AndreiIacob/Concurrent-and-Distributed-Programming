import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { setCSBTitle } from './store/actions';
import AbstractNavigation from '../../components/Navigation/AbstractNavigation/AbstractNavigation';
import styles from './CloudSafeBoxDetails.style';

class CloudSafeBoxDetails extends Component {

    componentWillMount() {
        const { setParams } = this.props.navigation;
        setParams({ CSBTitle: this.props.title });
    }

    static navigationOptions =
        ({ navigation }) => {

            const { state } = navigation;

            if (state.params != undefined) {
                return {
                    title: state.params.CSBTitle,
                    headerStyle: {
                        backgroundColor: '#0095ff',
                    },
                    headerTintColor: '#fff',
                }
            }
        };

    render() {
        // console.log(this.props);
        return (
            <View style={styles.container}>
                <AbstractNavigation
                    navigation={this.props.navigation}
                    extraBundle={{ keyRecord: "Online Password" }}
                    to={{ native: 'DefaultRecordList' }} >
                    <View style={styles.item}>
                        <Text >Passwords</Text>
                        <Text style={styles.subtitle}>View your stored passwords</Text>
                    </View>
                </AbstractNavigation>

                <AbstractNavigation
                    navigation={this.props.navigation}
                    extraBundle={{ keyRecord: "Credit Card" }}
                    to={{ native: 'DefaultRecordList' }} >
                    <View style={styles.item}>
                        <Text >Credit Cards</Text>
                        <Text style={styles.subtitle}>View your credit cards</Text>
                    </View>
                </AbstractNavigation>

                <AbstractNavigation
                    navigation={this.props.navigation}
                    extraBundle={{ keyRecord: "Notes" }}
                    to={{ native: 'DefaultRecordList' }} >
                    <View style={styles.item}>
                        <Text >Notes</Text>
                        <Text style={styles.subtitle}>View your notes</Text>
                    </View>
                </AbstractNavigation>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        records: state.CSBDetailsReducer.records,
        title: state.CSBDetailsReducer.title,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onTitleUpdated: (title) => dispatch(setCSBTitle(title)),
        navigateForward: () => dispatch(navigate(true)),
        navigateBackwards: () => dispatch(navigate(false))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CloudSafeBoxDetails);