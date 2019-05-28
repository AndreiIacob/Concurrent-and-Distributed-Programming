import {StyleSheet} from 'react-native';


const style = StyleSheet.create({
    ProfileSummary: {
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },

    ImageContainer: {
        width: "100%",
        display: "flex"
    },

    Image: {
        marginTop:20,
        marginBottom:20,
        marginLeft:'auto',
        marginRight:'auto',
        width: 64,
        height: 64
    },

    Name: {
        color: "#222",
        textAlign: "center",
        marginBottom: 10
    },
    CloudSafeBoxesNr: {
        fontWeight: "normal"
    }

});

export default style;
