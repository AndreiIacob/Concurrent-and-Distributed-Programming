import React from 'react';

import { View, Image, Text } from 'react-native';
import ProgressCircle from './ProgressCircle/ProgressCircle'
import styles from './LoaderWrapper.style';

const LoaderWrapper = (props) => {


    let imageLoader = <Image source={require('../../assets/global/images/loaders/loader_blue.gif')}
        style={styles.imageLoader} />

    let progressLoader = null;
    if(props.progress){
        progressLoader = <ProgressCircle
            percent={props.progress}
            radius={40}
            borderWidth={6}
            color="#3c7eb1"
            shadowColor="#999"
            bgColor="#f1f1f1"
        >
            <Text style={{ fontSize: 18 }}>{props.progress+'%'}</Text>
        </ProgressCircle>
    }

    if (props.modalLoader) {
        const loadingStyle = {
            zIndex: 10000,
            position: "absolute",
            backgroundColor: props.isLoaded ? "#EEEEEE00" : "#EEEEEECC",
            display: props.isLoaded ? "none" : "flex"
        };

        const appLoader = (
            <View>
                {props.children}
                <View style={[styles.overlay, loadingStyle]}>
                    {props.progress?progressLoader:imageLoader}
                </View>

            </View>
        );
        return appLoader;
    } else {

        const loadingStyle = {
            display: props.isLoaded ? 'none' : 'flex'
        };

        const appLoader = (
            <View style={[styles.overlay, loadingStyle]}>
                {props.progress?progressLoader:imageLoader}
            </View>
        );

        return props.isLoaded ? props.children : appLoader
    }

};

export default LoaderWrapper;