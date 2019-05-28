import React, { Component } from 'react';
import { View } from 'react-native';
import MobileAppContainer from './MobileContainer/MobileAppContainer'
import AppNavigator from './MobileContainer/AppNavigator'

import styles from './AppContainer.style';

export default class AppContainer extends Component {

    componentWillMount() {


        if (typeof window === 'object') {
            if (!window.crypto) window.crypto = {}
            if (!window.crypto.getRandomValues) {
                window.crypto.getRandomValues = function getRandomValues(arr) {
                    let orig = arr;
                    if (arr.byteLength !== arr.length) {
                        // Get access to the underlying raw bytes
                        arr = new Uint8Array(arr.buffer)
                    }
                    //const bytes = randomBytes(arr.length)
                    //TODO fix this
                    //start hack
                    let bytes = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for (var i = 0; i < arr.length; i++)
                        bytes += possible.charAt(Math.floor(Math.random() * possible.length));
                    //end hack


                    for (var i = 0; i < bytes.length; i++) {
                        arr[i] = bytes[i]
                    }

                    return orig
                }
            }
        }


        // function loadCrypto(callback){
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function () {
        //         if (this.readyState === 4 && this.status === 200) {
        //             // Typical action to be performed when the document is ready:
        //             console.log("loading crypto");
        //             eval(xhttp.responseText);
        //             console.log(global.crypto);
        //             console.log("crypto loaded");
        //
        //             callback();
        //
        //
        //
        //             /*window.$$ = {};
        //             window.$$.PSK_PubSub = window.reactClientRequire("soundpubsub").soundPubSub;
        //             console.log(window.$$);*/
        //
        //
        //         }
        //     };
        //     xhttp.open("GET", "http://192.168.103.149:3000/apps/csb/scripts/cryptoShim.js", true);
        //     xhttp.send();
        // }


        //loadCrypto(loadMobileClient);


    }

    render() {
        return (
            <AppNavigator />
        );
    }
}