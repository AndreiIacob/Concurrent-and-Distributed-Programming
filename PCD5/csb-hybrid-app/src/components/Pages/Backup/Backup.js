import React from "react";
import {Text, TouchableHighlight,View,StyleSheet} from 'react-native';
import InteractionsManager from '../../../services/InteractionsManager';

let InteractService = InteractionsManager.getInstance();
export default class Backup extends React.Component {


    performBackup() {
        InteractService.doBackup(() => {
            console.log("Backup ok");
        })
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableHighlight style={style.button} onPress={() => this.performBackup()}>
                <Text style={style.text}> Backup now </Text>
                 </TouchableHighlight>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#FFFFFFAA",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        padding: 15,
        width: 140,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        backgroundColor:"green"
    },
    text:{
        color:"#FFF",
        textAlign:"center",
        fontSize:18
    }
})
