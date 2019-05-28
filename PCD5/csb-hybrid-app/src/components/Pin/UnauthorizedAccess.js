import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class UnauthorizedAccess extends React.Component {


    render() {
        return (
            <View style={style.Overlay}>
                <View style={style.Container}>
                    <Image style={style.Image} source={require('../../assets/global/images/unauthorized.png')}/>
                    <View style={style.ErrorMessageContainer}>
                        <Text style={style.ErrorMessage}>{this.props.errorMessage}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    Overlay: {
        width: "100%",
        height: "100%",
        position: "fixed",
        backgroundColor: "#008acd",
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    },

    Container: {
        zIndex: 10000,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width:"100%"
    },
    Image:{
        marginBottom:50,
        width:512,
        height:512
    },
    ErrorMessageContainer:{
      width:"80%",
      backgroundColor:"#00527a77",
      padding:20
    },
    ErrorMessage:{
        color:"#EFAD00",
        fontSize:22,
        textAlign:"center"

    }
});
