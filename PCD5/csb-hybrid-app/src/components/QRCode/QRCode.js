import React from 'react';
import {Platform, WebView,View} from "react-native";
import QRious from "qrious";
import WebViewForWeb from "WebView";


class QRCode extends React.Component{
    render () {
        let qr = new QRious({
            size: 320,
            value: this.props.value
        });

        let QRCodeWebView = Platform.OS === "web"?WebViewForWeb:WebView;

        return (
            <View style={{width:"100%",height:"100%", alignItems: 'center', justifyContent: 'center', flex:1}}>
                <View style={{width:"325px",height:"325px", alignItems: 'center', justifyContent: 'center'}}>
                    <QRCodeWebView
                        automaticallyAdjustContentInsets={false}
                        scalesPageToFit={Platform.OS === 'android'}
                        contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
                        source={{html: "<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><image id='qr-code'></image><script>var image = document.getElementById('qr-code'); image.setAttribute('src','" + qr.toDataURL() + "');</script>"}}
                        opaque={false}
                        underlayColor={'transparent'}
                        style={this.props.style}
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        onLoad={this.props.onLoad}
                        onLoadEnd={this.props.onLoadEnd}
                        originWhitelist={['*']}
                    />
                </View>
            </View>
        );
    }
};


export default QRCode;
