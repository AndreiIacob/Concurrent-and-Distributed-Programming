import React, { Component } from 'react';
import { Image, Text, View, TouchableHighlight } from "react-native";

import StyleSheetFactory from "../WizardStyleFactory/WizardStyleFactory";

export default class CsbTypeContainer extends Component {

    state = {
        hover: false,
        down: false
    };

    handleMouseEnter() {
        this.setState({
            hover: true
        })
    }

    handleMouseLeave() {
        this.setState({
            hover: false
        })
    }

    handleMouseDown() {
        this.setState({
            down: true
        });
    }

    handleMouseUp() {
        this.setState({
            down: false
        });
    }

    handleMouseClick() {
        this.props.toogleTypeHandler(this.props.csbType);
    }

    render() {
        const style = StyleSheetFactory.getStyleSheet(this.props.breakpoint);
        let selected = this.props.selected
            ? (<Image
                style={style.typeSelected}
                source={require("../../../../assets/global/images/type_checked.png")}
            />)
            : (<Image
                style={style.typeSelected}
                source={require("../../../../assets/global/images/type_unchecked.png")}
            />);
        return (
            <TouchableHighlight
                onPress={() => this.handleMouseClick()}
                onMouseDown={() => this.handleMouseDown()}
                onMouseUp={() => this.handleMouseUp()}
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}
                underlayColor="rgb(247, 248, 252)">
                <View
                    style={[
                        style.imageContainer,
                        this.state.hover ? style.mouseHoverStyle : null,
                        this.state.down ? style.mouseDownStyle : null
                    ]}
                >
                    {selected}
                    <Image source={this.props.csbType.icon} style={style.csbTypeIcon} />
                    <Text style={style.csbTypeLabel}>{this.props.csbType.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
