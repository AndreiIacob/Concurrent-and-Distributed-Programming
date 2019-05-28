import React, { Component } from 'react';
import { View, Button } from 'react-native';
import style from './NewCloudSafeBox.style'
import Panel from "../../components/Panel/Panel";
import NewCSBDetails from './FormPages/CSBDetails/CSBDetails';
import RecoveryPhrase from './FormPages/RecoveryPhrase/RecoveryPhrase';
import FinishedPage from './FormPages/FinishedPage/FinishedPage';
import { connect } from 'react-redux';
import {setCSBTitle, setCSBIcon, changedCSBType, navigate, resetStore} from './store/actions';
import { addCSB } from './../../store/actions';
import AbstractNavigation from '../../components/Navigation/AbstractNavigation/AbstractNavigation';

class NewCloudSafeBox extends Component {

    render() {
        let currentPage = null;

        switch (this.props.currentPage) {
            case "details":
                currentPage = (<NewCSBDetails
                    csbName={this.props.csbName}
                    csbIcon={this.props.csbIcon}
                    icons={this.props.icons}
                    onPressIcon={this.props.onPressIcon}
                    defaultValue={this.props.csbType}
                    onTypeChange={this.props.onCSBTypeUpdated}
                    nameUpdateHandler={(event) => this.props.onTitleUpdated(event)}
                    types={this.props.options}
                />);
                break;
            case "recovery_phrase":
                currentPage = (<RecoveryPhrase />);
                break;
            case "finished":
                currentPage = (<FinishedPage />);
                break;
            default:
                currentPage = (<NewCSBDetails
                    csbName={this.props.csbName}
                    defaultValue={this.props.csbType}
                    onTypeChange={this.props.onCSBTypeUpdated}
                    nameUpdateHandler={(event) => this.props.onTitleUpdated(event.target.value)}
                    types={this.props.options}
                />);
        }

        let backButton = null;
        let nextButton = null;
        if (this.props.currentPage !== this.props.pages[0]) {
            backButton = <View style={style.Button}>
                <Button
                    title="Back"
                    onPress={this.props.navigateBackwards}
                    color="blue"
                />
            </View>
        }

        if (this.props.currentPage !== this.props.pages[this.props.pages.length - 1]) {
            nextButton = <View style={style.Button}>

                <Button
                    disabled={this.props.csbName.length === 0}
                    title="Next"
                    onPress={this.props.navigateForward}
                    color="green"
                />
            </View>
        } else {
            nextButton =
                <AbstractNavigation
                    navigation={this.props.navigation}
                    to={{ native: 'MobileAppContainer', web:'/' }}
                >
                    <View style={style.Button}>
                        <Button
                            disabled={this.props.csbName.length === 0}
                            title="Finish"
                            onPress={() => {
                                this.props.finish({ 'name': this.props.csbName });
                                setImmediate(()=>this.props.resetStore());
                                if(this.props.navigation){
                                    this.props.navigation.pop();
                                }
                            }}
                            color="green"
                        />
                    </View>
                </AbstractNavigation>
        }

        return (
            <View style={{width: '100%'}}>
                <Panel name="Enter CSB Details">
                    {currentPage}

                    <View >
                        {backButton}
                        {nextButton}
                    </View>

                </Panel>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        options: state.newCSB.options,
        csbType: state.newCSB.csbType,
        csbName: state.newCSB.csbName,
        recoveryPhrase: state.newCSB.recoveryPhrase,
        currentPage: state.newCSB.currentPage,
        pages: state.newCSB.pages,
        icons: state.newCSB.icons,
        csbIcon: state.newCSB.csbIcon
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onPressIcon: (item) => dispatch(setCSBIcon(item)),
        finish: (item) => dispatch(addCSB(item)),
        resetStore: () => dispatch(resetStore()),
        onTitleUpdated: (title) => dispatch(setCSBTitle(title)),
        onCSBTypeUpdated: (csbType) => dispatch(changedCSBType(csbType)),
        navigateForward: () => dispatch(navigate(true)),
        navigateBackwards: () => dispatch(navigate(false))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewCloudSafeBox);
