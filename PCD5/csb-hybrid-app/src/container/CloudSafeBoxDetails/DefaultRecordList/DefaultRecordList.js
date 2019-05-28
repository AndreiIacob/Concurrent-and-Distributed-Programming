import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AbstractNavigation from '../../../components/Navigation/AbstractNavigation/AbstractNavigation';
import styles from './DefaultRecordList.style';
// import { setCSBTitle } from './store/actions';


class DefaultRecordList extends Component {


    componentWillMount() {
        const { setParams } = this.props.navigation;
        setParams({ keyRecord: this.props.navigation.state.params.keyRecord });
    }

    static navigationOptions =
        ({ navigation }) => {

            const { state } = navigation;

            if (state.params != undefined) {
                return {
                    title: state.params.keyRecord,
                    headerStyle: {
                        backgroundColor: '#0095ff',
                    },
                    headerTintColor: '#fff',
                }
            }
        };

    render() {

        const cards = this.props.records[this.props.navigation.state.params.keyRecord];

        // console.log('CSBPasswords', passwds);
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ margin: 10 }}
                    data={cards}
                    key={({ item }) => item.name}
                    renderItem={({ item }) =>

                        <AbstractNavigation
                            navigation={this.props.navigation}
                            extraBundle={{ extraData: item }}
                            to={{ native: 'DefaultRecordView' }} >

                            <View style={styles.item}>
                                <Text >{item.Title}</Text>
                                <Text >{item.URL}</Text>
                            </View>
                        </AbstractNavigation>
                    }
                />
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
        // onTitleUpdated: (title) => dispatch(setCSBTitle(title)),
        // navigateForward: () => dispatch(navigate(true)),
        // navigateBackwards: () => dispatch(navigate(false))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DefaultRecordList);