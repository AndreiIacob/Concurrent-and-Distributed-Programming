import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.9,
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLoader: {
        width: 150,
        height: 150
    }
});

export default styles;