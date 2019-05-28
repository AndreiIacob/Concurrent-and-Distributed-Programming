import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import style from "./Modal.style.js";
export default class Modal extends Component {

    state = {
        closeBtnHovered: false
    };
    onMouseEnter() {
        this.setState({
            closeBtnHovered: true
        })
    }
    onMouseLeave() {
        this.setState({
            closeBtnHovered: false
        })
    }

    render() {
        return (
            <View style={style.ModalOverlay}>
                <View style={[style.ModalContainer, this.props.style]}>
                    <View style={style.ModalHeader}>
                        <Text style={style.ModalTitleText}>{this.props.title}</Text>
                        <TouchableOpacity style={[style.CloseButton, this.state.closeBtnHovered ? { opacity: 0.6 } : null]}
                            onMouseEnter={() => this.onMouseEnter()}
                            onMouseLeave={() => this.onMouseLeave()}
                            onClick={() => this.props.onClose()}>
                            <Image source={require('../../assets/global/images/close.png')}
                                style={style.CloseImageButton} />
                        </TouchableOpacity >
                    </View>

                    {this.props.children}
                </View>
            </View>
        );
    }
};
