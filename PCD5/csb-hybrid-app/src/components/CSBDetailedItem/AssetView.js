import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class AssetView extends React.Component {

    state = {
        displayDownloadButton: true,
        errorInfo: null,
        messageInfo: null
    }

    handleDownloadButton = (value, type, callInteract) => {
        this.setState({
            displayDownloadButton: value
        });

        if (callInteract) {
            this.props.webViewHandler(!value);
            this.props.interact.displayExtractedAssetFromCSB(this.props.assetName, type, (progress)=>{
              console.log(progress);
            }, this.csbExtractHandler);
        }
    };

    csbExtractHandler = (success, info) => {
        switch (success) {
            case true: {
                this.setState({
                    messageInfo: info
                });
                break;
            }

            case false: {
                this.setState({
                    errorInfo: info
                });
                break;
            }

            default: {
                this.handleDownloadButton(true);
                this.props.webViewHandler(false);
                break;
            }
        }
    }

    render() {
        const errorMessage = !this.state.errorInfo
            ? null
            : <Text style={styleSheet.errorMessageText}>{this.state.errorInfo}</Text>
        const messageInfo = !this.state.messageInfo
            ? null
            : <Text style={styleSheet.messageText}>{this.state.messageInfo}</Text>

        let downloadButton = null
        if (this.state.displayDownloadButton) {
            downloadButton = (
                <View style={styleSheet.downloadContainer}>
                    <TouchableOpacity onPressOut={() => this.handleDownloadButton(false, 'display', true)}>
                        <View style={styleSheet.downloadButton}>
                            <Text style={styleSheet.downloadButtonText}>View</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPressOut={() => this.handleDownloadButton(true, 'download', true)}>
                        <View style={styleSheet.downloadButton}>
                            <Text style={styleSheet.downloadButtonText}>Download</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styleSheet.wrapper}>
                {downloadButton}
                {errorMessage}
                {messageInfo}
            </View>
        );
    }
}

const styleSheet = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    downloadContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    downloadButton: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#2c7daf'
    },

    downloadButtonText: {
        color: 'white',
        fontSize: '14',
        fontWeight: '600'
    },

    errorMessageText: {
        color: 'red',
        fontSize: '14',
        fontWeight: '600'
    },

    messageText: {
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: '14',
        color: '#616161'
    }
});