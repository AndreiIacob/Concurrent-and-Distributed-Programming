import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        padding: 5
    },

    item: {
        flex: 1,
        flexDirection: 'column',
        height: "100%",
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    csbImage: {
        width: 100,
        height: 100
    },
    csbDetails:{
        position: "absolute",
        maxWidth: 200,
        width: "auto",
        height: "auto",
        flex: 1,
        backgroundColor: "#eaedf0",
        borderColor: "#dadada",
        borderWidth: 1,
        bottom: -25
    },
    csbTextDetails:{
        padding: 5,
        fontSize: 11,
        color: "#585858"
    },
    csbName:{
        color:"#5a718f",
    },

    itemInvisible: {
        backgroundColor: 'transparent',
    }
});

export default style;