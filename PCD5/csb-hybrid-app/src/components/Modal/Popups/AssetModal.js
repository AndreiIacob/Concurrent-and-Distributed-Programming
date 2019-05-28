import React from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'WebView';

import Modal from '../Modal';
import LoaderWrapper from '../../../hoc/LoaderWrapper/LoaderWrapper';
import AssetView from '../../CSBDetailedItem/AssetView';
import AssetInformation from '../../CSBDetailedItem/AssetInformation';

import InteractionsManager from '../../../services/InteractionsManager';

let InteractService;

export default class AssetModal extends React.Component {
    constructor(props) {
        super(props);
        const assetPath = props.csbsPath + '/' + props.assetAlias;
        this.state.assetPath = assetPath;
        this.state.progressMessages = ['Your asset from [' + assetPath + '] is being dectypted...'];
    }

    state = {
        isLoaded: false,
        documentName: '',
        webViewAssetOpened: false,
        progress: 1
    };

    componentDidMount() {
        this.loadAssetInfo(this.updateProgressMessages, this.prepareAssetInfoForDownload);
        let oldProgress = this.state.progress;

        let nextProgressThick = ()=>{
            setTimeout(()=>{
                if(oldProgress === this.state.progress){
                    oldProgress ++;
                    this.setState({
                        progress:oldProgress
                    }, ()=>{nextProgressThick()})
                }
            },300);
        };

        nextProgressThick();
    }

    prepareAssetInfoForDownload = (fileName) => {
        this.setState({
            documentName: fileName,
            isLoaded: true
        });
    };

    updateProgressMessages = (message) => {
        const messages = [...this.state.progressMessages];
        messages.push(message);
        this.setState({
            progressMessages: messages
        });
    };

    loadAssetInfo = (callbackMessageInfo, callbackDownloadInfo) => {
        InteractService = InteractionsManager.getInstance(this.webView, "fileDownloader");

        InteractService.extractAssetFromCSB(this.state.assetPath, (progress) => {
            this.setState({progress: progress})
        }, (info, savedAssetPath) => {
            callbackMessageInfo(info);

            if (savedAssetPath) {
                callbackDownloadInfo(savedAssetPath.replace('/', ''));
            }
        });
    };

    webViewHandler = (value) => {
        this.setState({
            webViewAssetOpened: value
        });
    }

    render() {
        if (!this.props.displayAssetModal) return null;

        return (
            <Modal
                title={"Download asset " + this.props.assetAlias}
                onClose={() => this.props.closeModal()}
                style={styleSheet.wrapper}>

                <AssetInformation
                    isLoaded={this.state.isLoaded}
                    progressMessages={this.state.progressMessages}/>

                <LoaderWrapper
                    progress={this.state.progress}
                    isLoaded={this.state.isLoaded}
                    modalLoader={true}>
                    <AssetView
                        interact={InteractService}
                        assetName={this.state.documentName}
                        webViewHandler={this.webViewHandler}/>
                </LoaderWrapper>

                <View style={this.state.webViewAssetOpened ? styleSheet.webViewOpened : styleSheet.webViewClosed}>
                    <WebView ref={(webView) => {
                        this.webView = webView;
                    }}
                             source={{uri: require('../../../../public/apps/csb/fileDownloader/fileDownloader.html')}}/>
                </View>

            </Modal>
        );
    }
}

const styleSheet = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 0,
        borderRadius: 0
    },

    webViewOpened: {
        position: 'absolute',
        marginTop: 40,
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    webViewClosed: {
        width: 0,
        height: 0,
    }
});