import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    item: {
        width: 100,
        height: 50,
        borderRightWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemValue: {
        height: 50,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    headerRight: {
        color: 'white',
        marginRight: 10
    }
});

export default styles;
