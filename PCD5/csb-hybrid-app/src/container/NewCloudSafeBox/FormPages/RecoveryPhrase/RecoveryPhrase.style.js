import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    recoveryPhraseContainer: {
        flex: 1,
        width: '80%',
        minWidth: 260,
        marginTop: 10,
        marginLeft: -10,
        alignItems: 'center',
        flexDirection: 'row',
    },

    recoveryPhrase: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    recoveryWord: {
        borderColor: "#CCC",
        borderWidth: 1,
        backgroundColor: "#EFEFEF",
        padding: 15,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10
    },
    
    keepSeedConsent: {
        // top: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    
    consentCheckbox: {
        height: 24,
        width: 24,
        marginRight: 10,
        padding: 2,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#ddd"
    }
});

export default styles;