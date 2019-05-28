import { StyleSheet } from 'react-native';

import { commonStyle } from './Common.style';

export default class StyleSheetFactory {
    static getSheet() {
        return StyleSheet.create({
            wizardContainer: {
                ...commonStyle.wizardContainer
            },

            centeredContainer: {
                ...commonStyle.centeredContainer
            },

            flexEndContainer: {
                ...commonStyle.flexEndContainer
            },

            actionsContainer: {
                ...commonStyle.actionsContainer,
                height: 50
            },

            continueButton: {
                ...commonStyle.continueButton,
                bottom: -10
            },

            disabledContinueButton: {
                ...commonStyle.disabledContinueButton
            },

            continueText: {
                ...commonStyle.continueText
            },

            stepName: {
                ...commonStyle.stepName,
                fontSize: 18
            },

            tip: {
                ...commonStyle.tip,
                fontSize: 12
            },

            csbNameTextInput: {
                ...commonStyle.csbNameTextInput
            },

            // ScrollView Style
            contentWrapper: {
                ...commonStyle.contentWrapper
            },
            // End ScrollView

            // CSB Types styles
            typeContainer: {
                ...commonStyle.typeContainer,
                flexDirection: 'column',
                width: '100%',
            },

            csbTypeContainer: {
                ...commonStyle.csbTypeContainer
            },

            csbRowContainer: {
                ...commonStyle.csbRowContainer
            },

            csbTypeContainerSelected: {
                ...commonStyle.csbTypeContainerSelected
            },

            csbCheckbox: {
                ...commonStyle.csbCheckbox
            },

            mouseHoverStyle: {
                ...commonStyle.mouseHoverStyle
            },

            mouseDownStyle: {
                ...commonStyle.mouseDownStyle
            },

            imageContainer: {
                ...commonStyle.imageContainer,
                margin: 10,
                padding: 10
            },

            csbTypeLabel: {
                ...commonStyle.csbTypeLabel,
                fontSize: 18,
                padding: 2
            },

            typeSelected: {
                ...commonStyle.typeSelected
            },

            csbTypeIcon: {
                height: 30, 
                width: 30,
                marginRight: 20
            },
            // End CSB Types styles

            // Recovery Phrase styles
            recoveryPhraseContainer: {
                ...commonStyle.recoveryPhraseContainer
            },

            recoveryPhrase: {
                ...commonStyle.recoveryPhrase
            },

            recoveryWord: {
                ...commonStyle.recoveryWord
            },

            keepSeedConsent: {
                ...commonStyle.keepSeedConsent
            },

            checkbox: {
                ...commonStyle.checkbox
            },

            checkedChecbox: {
                ...commonStyle.checkedChecbox
            }
            // End Recovery Phrase style
        });
    }
}