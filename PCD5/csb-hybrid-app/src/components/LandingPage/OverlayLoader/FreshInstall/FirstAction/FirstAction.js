import React from 'react';
import { TouchableOpacity, Linking } from 'react-native'

import FirstActionContainer from './FirstActionContainer';

const FirstAction = (props) => {
    const handleClick = () => {
        Linking.canOpenURL(props.data.to.web).then(supported => {
            if (supported) {
                Linking.openURL(props.data.to.web);
            } else {
                console.log("Don't know how to open URI: " + props.data.to.web);
            }
        });
    };

    return (
        <TouchableOpacity onPress={handleClick}>
            <FirstActionContainer
                breakpoint={props.breakpoint}
                data={props.data} />
        </TouchableOpacity>
    )
};

export default FirstAction;