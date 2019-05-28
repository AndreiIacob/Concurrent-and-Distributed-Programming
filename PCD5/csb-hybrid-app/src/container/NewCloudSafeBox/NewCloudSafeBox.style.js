import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    Container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
    },
    Label: {
        width: "15%",
        minWidth: 100
    },
    TextInput: {
        width: "85%",
        // minWidth: 350,
        borderColor: "#AAA",
        height: 30,
        borderStyle: "solid",
        borderWidth: Platform.OS === 'web' ? 1 : 0,
        borderRadius: Platform.OS === 'web' ? 3 : 0,
        paddingLeft: 3
    },
    ButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop: 20
    },
    Button: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 20,

    },
    image: {
        width: 60,
        height:60,
        margin: 10
    }
});

export default styles;
