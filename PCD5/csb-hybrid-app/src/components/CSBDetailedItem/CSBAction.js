import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CSBAction extends React.Component {
    constructor(props) {
        super(props);
        this.hasModalComponent = this.props.modalComponent ? true : false;
    }

    state = {
        modalIsOpened: false
    };

    showModal() {
        if (this.hasModalComponent) {
            this.setState({
                modalIsOpened: true
            })
        }
    }

    closeModal(actionCompleted) {
        this.setState({
            modalIsOpened: false
        });

        if(actionCompleted){
            this.props.reload();
        }

    }

    render() {
        let ModalPopupComponent = this.props.modalComponent;
        let modalComponent = null;
        if (ModalPopupComponent && this.state.modalIsOpened === true) {
            modalComponent = <ModalPopupComponent
                {...this.props}
                csbsPath={this.props.csbsPath}
                closeModal={(actionCompleted) => this.closeModal(actionCompleted)} />;
        }

        return (
            <View style={{ zIndex: this.state.modalIsOpened ? 2 : null }}>
                <View style={styleSheet.actionContainer}>
                    <TouchableOpacity onPress={() => this.showModal()}>
                        <View style={[
                            styleSheet.button,
                            { backgroundColor: this.props.color }
                        ]}>
                            <Text style={[
                                styleSheet.text,
                                { color: this.props.textColor }
                            ]}>{this.props.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {modalComponent}
                </View>
            </View>
        )
    }
};

const styleSheet = StyleSheet.create({
    actionContainer: {
        padding: 10
    },

    button: {
        padding: 10,
        width: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,

    },

    text: {
        fontWeight: '600',
        textAlign: 'center'
    }
});