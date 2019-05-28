import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from './DefaultRecordView.style'
// import { setCSBTitle } from './store/actions';


class DefaultRecordView extends Component {

    componentWillMount() {
        const { setParams } = this.props.navigation;
        setParams({ passwordTitle: this.props.navigation.state.params.extraData.Title });
        this.props.navigation.setParams({
            edit: this.onPressEdit.bind(this)
        });
    }

    static navigationOptions =
        ({ navigation }) => {

            const { state } = navigation;

            if (state.params != undefined) {
                return {
                    title: state.params.passwordTitle,
                    headerStyle: {
                        backgroundColor: '#0095ff',
                    },
                    headerTintColor: '#fff',
                    headerRight: <Text onPress={navigation.state.params.edit} style={styles.headerRight}>Edit</Text>
                }
            }
        };

    onPressEdit() {
        console.log('edit press', this.props);
        this.setState({ edit: true });
    }

    onSubmitEdit = () => {
        console.log('submit edit', this.state);
        this.setState({ edit: false });
    }

    submitButton = () => {
        if (this.state !== null && this.state.edit === true)
            return (<Button
                onPress={this.onSubmitEdit}
                title="Submit"
                color="#0095ff" />)
    }

    editText = (item) => {
        let key = item.key;

        if (this.state !== null && this.state.edit === true)
            return (
                <TextInput
                    ref={(el) => { this[key] = el; }}
                    onChangeText={(text) => { this.props.navigation.state.params.extraData[key] = text }
                    }>
                    {item.value}
                </TextInput>)
        else
            return (<Text>{item.value}</Text>)
    }

    render() {
        // console.log('render', this.state);
        // console.log(this.props.navigation.state.params);

        let dataArray = []
        Object.keys(this.props.navigation.state.params.extraData).map((key, i) => {

            let item = {};
            item.key = key;
            item.value = this.props.navigation.state.params.extraData[key];
            dataArray.push(item);
        });

        return (
            <View >
                <FlatList
                    style={{ margin: 20 }}
                    data={dataArray}
                    key={({ item }) => item.key}
                    renderItem={({ item }) =>

                        <View style={styles.container} key={item.key}>
                            <View style={styles.item}>
                                <Text style={{ color: 'gray' }}>{item.key}</Text>
                            </View>
                            <View style={styles.itemValue}>
                                {this.editText(item)}
                            </View>
                        </View>
                    }
                />
                {this.submitButton()}
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
        navigateForward: () => dispatch(navigate(true)),
        navigateBackwards: () => dispatch(navigate(false))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DefaultRecordView);