import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import TitleText from '../../components/Pages/Settings/TitleText';
import Input from '../../components/Pages/Settings/Input';
import ActionButton from '../../components/Pages/Settings/ActionButton';

/**
 * @param {string} props.payload - the payload for this component (SEED)
 * @param {function} props.saveSeed - the handler for saving the seed in local storage
 * @param {function} props.deleteSeed - the handler to delete the seed from local storage
 */
const SeedContainer = (props) => {


    let view = null;
    if (props.payload) {
        view = (<View>
            <TitleText text='Recovery phrase Settings'/>
            <View style={styles.wrapper}>
                <Input
                    title={'Recovery phrase'}
                    value={props.payload}
                    enableEdit={false}
                    updateField={value => props.saveSeed(value)}/>

                <ActionButton
                    actionHandler={props.deleteSeed}
                    label={'Delete SEED'}/>
            </View>
        </View>);
    }
    else {
        view = <View style={styles.centerWrapper}>
            <Image style={styles.image} resizeMode="contain" source={require("../../assets/global/images/no_seed_stored.png")}/>
            <Text style={styles.noSeedInfo}>Recovery phrase is not stored on this device anymore</Text>
        </View>;
    }
    return (view);
};

export default SeedContainer;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    centerWrapper:{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width:128,
        height:128
    },
    noSeedInfo: {
        fontSize: 17,
        marginTop:10,
        textAlign: "center"
    }
});