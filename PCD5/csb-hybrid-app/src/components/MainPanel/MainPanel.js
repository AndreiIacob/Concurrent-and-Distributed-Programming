import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Panel from '../Panel/Panel';
import CSBChildrenContainer from '../CSBDetailedItem/CSBChildrenContainer';

import { getCSBsList } from '../../store/actions';
import StyleFactory from '../../style/DashBoardStyle/StyleFactory';

class MainPanel extends React.Component {
    state = {
        isLoaded: false
    };

    componentWillMount() {
        this.props.loadCsbNames('');
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.safeBoxes.length > 0
            && nextState.isLoaded === false) {
            this.setState({
                isLoaded: true
            });
        }
    }

    render() {
        const style = StyleFactory.getStyleSheet(this.props.breakpoint);
        const visualPreferences = StyleFactory.getVisualPreferences(this.props.breakpoint);
        return (
            <View style={style.mainPanel}>
                <Panel
                    breakpoint={this.props.breakpoint}
                    name={"Dashboard"}>
                    <CSBChildrenContainer
                        csbsPerPage = {visualPreferences.COLUMN_NUMBER_FOR_DASHBOARD_LISTED_CSBS}
                        safeBoxes={this.props.safeBoxes}
                        isLoaded={this.state.isLoaded} />
                </Panel>
            </View>
        )
    }
};
const mapStateToProps = state => {
    return {
        safeBoxes: state.global.user.safeBoxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadCsbNames: (csbsPath) => dispatch(getCSBsList(csbsPath)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
