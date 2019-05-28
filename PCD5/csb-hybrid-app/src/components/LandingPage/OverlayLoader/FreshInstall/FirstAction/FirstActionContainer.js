import React from 'react';
import { View, Text, Image } from 'react-native';

import LandingPageStyleFactory from '../LandingPageStyleFactory/LandingPageStyleFactory';

export default class FirstActionContainer extends React.Component {
    state = {
        hover: false
    };

    handleMouseEnter = () => {
        this.setState({ hover: true });
    };

    handleMouseLeave = () => {
        this.setState({ hover: false });
    };

    render() {
        const style = LandingPageStyleFactory.getStyleSheet(this.props.breakpoint);
        return (
            <View onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <View style={[
                    style.itemContainer,
                    {
                        marginLeft: this.props.data.width * 0.03,
                        marginRight: this.props.data.width * 0.03
                    }
                ]}>
                    <Image
                        source={this.props.data.icon}
                        style={style.icon} />
                    <Text style={style.itemTextContainer}>
                        {this.props.data.title}
                    </Text>
                </View>
            </View>
        )
    }
};