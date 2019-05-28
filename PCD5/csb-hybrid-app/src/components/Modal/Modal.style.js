import { StyleSheet } from 'react-native';


const style = StyleSheet.create({
    ModalOverlay: {
        width: "100%",
        height: "100%",
        position: "fixed",
        backgroundColor: "#222222CC",
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    },
    ModalContainer: {
        backgroundColor: "#FEFEFE",
        borderColor: "#DDD",
        borderWidth: 1,
        borderRadius: 3,
        zIndex: 10000,
    },
    ModalHeader: {
        padding: 5,
        height: 40,
        width: "100%",
        backgroundColor: "#DEDEDE",
        flexDirection: "row"

    },
    ModalTitleText: {
        fontSize: 16,
        width: "100%",
        alignSelf: 'flex-start'
    },

    CloseButton: {
        alignSelf: 'flex-end',
        padding: 2,
        cursor: "pointer"

    },
    CloseImageButton: {
        width: 24,
        height: 24
    }
});

export default style;