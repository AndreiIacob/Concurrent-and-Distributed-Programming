import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './AppLoader.style'
export default class AppContainer extends Component {


    render() {
        const loadingStyle = {
            display: this.props.isLoaded === true ? 'none' : 'flex'
        };
        
        return (
            <View style={[styles.overlay, loadingStyle]}>
                <Image source={require('../../../../assets/global/images/loaders/loader_blue.gif')}
                    style={styles.imageLoader} />
            </View>
        );
    }
}