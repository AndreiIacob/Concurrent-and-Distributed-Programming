import React from 'react';
import { View, Text } from 'react-native';

import StyleFactory from '../../style/DashBoardStyle/StyleFactory';

const Panel = (props) => {
    const style = StyleFactory.getStyleSheet(props.breakpoint);

    return (
        <View style={style.panel}>
            <View>
                <Text style={style.title}>{props.name} </Text>
            </View>
            <View style={style.panelContent}>
                {props.children}
            </View>
        </View>
    );
}

export default Panel;