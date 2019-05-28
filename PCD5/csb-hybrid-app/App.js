import React from 'react'
import App from './src/App'
import {Provider} from "react-redux";
import store from './src/store/storeConfig';

export default class NativeApp extends React.Component {
    render() {
        return (<Provider store={store}>
            <App/>
        </Provider>)
    }
}