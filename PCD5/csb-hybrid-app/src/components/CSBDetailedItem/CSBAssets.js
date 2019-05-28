import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'WebView';

import AssetView from './AssetView';
import InteractionsManager from '../../services/InteractionsManager';

let InteractService;

class CSBAssets extends React.Component {
    state = {
        assetPath: '',
        progressMessages: [],
        documentName: null,
        documentBuffer: [],
        documentSize: 0
    }

    componentDidMount() {
        this.getAsset(this.props.location.pathname);
    }

    getAssetPath = (path) => {
        path = path.replace('/csb-assets/', '');
        return path;
    }

    getAsset = (path) => {
        const assetPath = this.getAssetPath(path);
        this.setState({
            assetPath: assetPath,
            progressMessages: ['Your asset from [' + assetPath + '] is being dectypted...']
        });

        InteractService = InteractionsManager.getInstance(this.webView, "fileDownloader");

        InteractService.extractAssetFromCSB(assetPath, (info, err, savedAssetPath) => {
            if (err && err !== 'CHUNK') {
                this.updateProgressMessages(info);
            }

            if (err === 'CHUNK') {
                this.updateChunks(info);
            }
            else {
                this.updateProgressMessages(info);
            }

            if (savedAssetPath) {
                this.prepareAsset(savedAssetPath.replace('/', ''));
            }
        });
    }

    updateChunks = (chunk) => {
        const documentBuffer = [...this.state.documentBuffer];
        const documentSize = this.state.documentSize + chunk.length;
        documentBuffer.push(chunk);
        this.setState({
            documentBuffer: documentBuffer,
            documentSize: documentSize
        });
    }

    prepareAsset = (fileName) => {
        this.setState({
            documentName: fileName,
            ready: true
        });
    }

    updateProgressMessages = (message) => {
        const messages = [...this.state.progressMessages];
        messages.push(message);
        this.setState({
            progressMessages: messages
        });
    }

    render() {
        return (
            <View style={style.itemContainer}>
                <AssetView
                    progressMessages={this.state.progressMessages}
                    documentName={this.state.documentName}
                    documentSize={this.state.ready ? this.state.documentSize : null}
                    documentBuffer={this.state.ready ? this.state.documentBuffer : null} />

                <View style={{ height: 0 }}>
                    <WebView ref={(webView) => { this.webView = webView; }}
                        source={{ uri: require('../../../public/apps/csb/fileDownloader/fileDownloader.html') }} />
                </View>
            </View>
        );
    }
};

export default CSBAssets;

const style = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    }
});
