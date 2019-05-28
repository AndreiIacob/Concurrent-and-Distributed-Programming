import React from 'react';
import AppNavigator from './MobileContainer/AppNavigator'

export default class AppContainer extends React.Component {

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
                    //const bytes = randomBytes(arr.length).
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

                    return orig;
                }
            }
        }



    }

    render() {


        return (
            <AppNavigator />
        );
    }
}


