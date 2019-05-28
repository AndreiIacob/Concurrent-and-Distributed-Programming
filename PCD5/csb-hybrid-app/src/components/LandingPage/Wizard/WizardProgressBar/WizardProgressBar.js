import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import WizardStep from './WizardStep'
import { updateBreakpoint } from '../../../../store/actions';

import StyleSheetFactory from './WizardBarStyleFactory/WizardBarStyleFactory';

class WizardProgressBar extends Component {
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

    createContent = (pagesToDisplay, stepValues) => {
        let content = pagesToDisplay.map((page, index) => {
            let stepType = "";
            switch (index) {
                case 0: stepType = "flex-start"; break;
                case pagesToDisplay.length - 1: stepType = "flex-end"; break;
                default: stepType = "center";
            }

            let wizardStep;
            if (page !== null && page !== undefined) {
                const stepValue = stepValues && stepValues.length > 0
                    ? stepValues[index]
                    : index + 1;

                wizardStep = (
                    <WizardStep step={stepValue}
                        breakpoint={this.props.breakpoint}
                        isCurrent={page.pageIndex === this.props.currentPage.pageIndex ? "true" : "false"}
                        isCompleted={page.pageIndex < this.props.currentPage.pageIndex ? "true" : "false"}
                        stepType={stepType}
                    />
                );
            }

            return (<View key={index}
                style={{
                    width: stepType === "flex-start" || stepType === "flex-end"
                        ? 50 / (pagesToDisplay.length - 1) + "%"
                        : 100 / (pagesToDisplay.length - 1) + "%"
                }}>
                {wizardStep}
            </View>);
        });
        return content;
    }

    createSmallContent = () => {
        const currentPageIndex = this.props.currentPage.pageIndex;
        let pagesToDisplay = [];
        let stepValues = [];
        switch (currentPageIndex) {
            case 0: {
                pagesToDisplay.push(null);
                pagesToDisplay.push(this.props.pages[0]);
                pagesToDisplay.push(this.props.pages[1]);
                stepValues = [0, 1, 2];
                break;
            }
            case (this.props.pages.length - 1): {
                pagesToDisplay.push(this.props.pages[2]);
                pagesToDisplay.push(this.props.pages[3]);
                pagesToDisplay.push(null);
                stepValues = [this.props.pages.length - 1, this.props.pages.length, 0];
                break;
            }
            default: {
                pagesToDisplay.push(this.props.pages[currentPageIndex - 1]);
                pagesToDisplay.push(this.props.pages[currentPageIndex]);
                pagesToDisplay.push(this.props.pages[currentPageIndex + 1]);
                stepValues = [currentPageIndex, currentPageIndex + 1, currentPageIndex + 2];
                break;
            }
        }
        return this.createContent(pagesToDisplay, stepValues);
    }

    render() {
        let style = StyleSheetFactory.getStyleSheet(this.props.breakpoint);

        let content = null;
        if (this.props.breakpoint === 'XS' || this.props.breakpoint === 'S') {
            content = this.createSmallContent();
        } else {
            content = this.createContent(this.props.pages);
        }

        return (
            <View style={style.wizardContent}>{content}</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(WizardProgressBar);