import React from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';

import Modal from '../Modal';
import DashboardWizard from '../../LandingPage/Wizard/DashboardWizard';
import { dashboardPages, updateBreakpoint } from '../../../store/actions';

class NewCSB extends React.Component {

    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.props.updateBreakpoint(width, height);
        Dimensions.addEventListener('change', this.resizeHandler);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.resizeHandler);
    }

    resizeHandler = (dimensions) => {
        this.props.updateBreakpoint(dimensions.window.width, dimensions.window.height);
    }

    render() {
        return (
            <Modal
                title="New CSB"
                onClose={() => {
                    this.props.closeModal()
                }}
                style={extraStyle}
                isLoaded={true}>
                <DashboardWizard
                    {...this.props}
                    isLoaded={true}
                    pagesConfiguration={dashboardPages}
                    preferences={'dashboardPreferences'}
                    closeModal={()=>this.props.closeModal(true)}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        breakpoint: state.settings.breakpoint
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateBreakpoint: (width, height) => dispatch(updateBreakpoint(width, height))
    }
};

//TODO add it to StyleFactory
const extraStyle = {
    paddingBottom: 40,
    width: "90%",
    height: "90%"
};
export default connect(mapStateToProps, mapDispatchToProps)(NewCSB);