import React from 'react';
import { TouchableHighlight } from 'react-native';

import { wizardPages } from '../../../../../store/actions';

import FirstActionContainer from './FirstActionContainer';

const FirstAction = (props) => {
    return (
        <TouchableHighlight
            onPress={() =>
                props.navigation.push(props.data.to.native, {
                    pagesConfiguration: props.navigation.getParam('pagesConfiguration', wizardPages),
                    preferences: props.navigation.getParam('preferences', 'wizardPreferences')
                })} >
            <FirstActionContainer
                breakpoint={props.breakpoint}
                data={props.data} />
        </TouchableHighlight>
    )
};

export default FirstAction;