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
                ...commonStyle.actionsContainer
            },

            continueButton: {
                ...commonStyle.continueButton
            },

            disabledContinueButton: {
                ...commonStyle.disabledContinueButton
            },

            continueText: {
                ...commonStyle.continueText,
                fontSize: 12
            },

            stepName: {
                ...commonStyle.stepName,
                fontSize: 16
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
                width: '100%'
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
                margin: 5,
                padding: 5
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
                ...commonStyle.recoveryWord,
                padding: 5
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