export const commonStyle = {
    wizardContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f8fcDD',
        padding: 20,
    },

    wizardPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '90%',
        position: 'relative'
    },

    centeredContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

    flexEndContainer: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },

    stepName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },

    tip: {
        fontStyle: 'italic',
        fontSize: 14,
        textAlign: 'center'
    },

    csbNameTextInput: {
        minWidth: 250,
        width: '50%',
        borderColor: '#AAA',
        height: 36,
        fontSize: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 3,
        marginTop: 20
    },

    actionsContainer: {
        minWidth: 220,
        width: '35%',
        height: 60
    },

    continueButton: {
        height: 45,
        backgroundColor: 'rgb(33, 150, 243)',
        borderRadius: 3,
        bottom: -20
    },

    disabledContinueButton: {
        backgroundColor: 'lightgrey',
    },

    continueText: {
        color: 'white',
        fontWeight: '500',
        padding: 12,
        textAlign: 'center'
    },

    // ScrollView styles
    contentWrapper: {
        padding: 20,
        height: '100%',
        width: '100%'
    },
    // End ScrollView styles

    // CSB Types styles
    typeContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30
    },

    csbTypeContainer: {
        backgroundColor: '#fafafaFF',
        width: '100%',
        position: 'relative',
        borderRadius: 5,
        borderColor: '#e2e9f4',
        borderWidth: 1,
        marginTop: 6,
        marginBottom: 6,
        padding: 10
    },

    csbTypeContainerSelected: {
        backgroundColor: '#e2e9f4',
        borderColor:'#c4d2e8'
    },

    csbRowContainer: {
        width: '100%',
        flexDirection: 'row'
    },

    csbCheckbox: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5
    },

    mouseHoverStyle: {
        backgroundColor: 'rgba(95,121,161,0.10)',
        borderColor: 'rgba(95,121,161,0.10)',
        borderWidth: 1
    },

    mouseDownStyle: {
        backgroundColor: 'rgba(95,121,161,0.20)',
    },

    imageContainer: {
        margin: 16,
        padding: 16,
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
    },

    csbTypeLabel: {
        color: '#5f79a1',
        fontSize: 15,
        justifyContent: 'center',
        textAlign: 'center'
    },

    typeSelected: {
        position: 'absolute',
        bottom: 35,
        right: 12,
        height: 28,
        width: 28,
        zIndex: 20
    },
    // End CSB Types styles

    // Recovery Phrase styles
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
        backgroundColor: '#e2e9f4',
        borderColor:'#c4d2e8',
        borderWidth: 1,
        padding: 15,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10
    },
    
    keepSeedConsent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    
    checkbox: {
        height: 24,
        width: 24,
        marginRight: 10,
        padding: 2,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#ddd'
    }
    // End Recovery Phrase style
}