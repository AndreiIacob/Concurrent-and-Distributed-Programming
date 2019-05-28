import React from 'react';
import { View } from 'react-native';
import SimpleWrapper from '../SimpleWrapper'

const layout = (props) => (
    <SimpleWrapper>
        <View>
            {props.children}
        </View>
    </SimpleWrapper>
)

export default layout;