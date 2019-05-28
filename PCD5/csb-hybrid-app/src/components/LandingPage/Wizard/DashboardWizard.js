import React from 'react';
import { View } from 'react-native';

import Wizard from './Wizard';

import StyleSheetFactory from '../../../style/DashBoardStyle/StyleFactory';

const DashboardWizard = (props) => {
    const styleSheet = StyleSheetFactory.getStyleSheet(props.breakpoint);

    return (
        <View style={styleSheet.dashboardWizardWrapper}>
            <Wizard
                {...props}
                csbsPath={props.csbsPath}
                isLoaded={props.isLoaded}
                preferences={props.preferences}
                pagesConfiguration={props.pagesConfiguration} />
        </View>
    );
}

export default DashboardWizard;