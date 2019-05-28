import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const NavigationSystem = (props) => {
    const elements = props.url.split('/');
    const depth = elements.length;

    const getSubLink = (fromIndex, toIndex) => {
        return '/csb/' + props.url.split('/').splice(fromIndex, toIndex).join('/');
    }

    const links = elements.map((el, index) => {
        const subLink = getSubLink(0, index + 1);
        return (
            <View key={subLink}>
                <TouchableOpacity onPressOut={() => props.history.push(subLink)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#ffffff' }}>{el}</Text>
                        <Text style={{ color: '#ffffff' }}>{index + 1 < depth ? ' / ' : ''}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    });

    return (
        <View style={{ flexDirection: 'row' }}>
            {links}
        </View>
    )
};

export default NavigationSystem;