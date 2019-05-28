import { StyleSheet } from 'react-native';

import { commonStyle } from './Common.style';

export default class StyleSheetFactory {
    static getSheet() {
        return StyleSheet.create({
            wizardContainer: {
                ...commonStyle.wizardContainer,
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
                ...commonStyle.continueText
            },

            stepName: {
                ...commonStyle.stepName
            },

            tip: {
                ...commonStyle.tip
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
                flexWrap: 'wrap'
            },

            mouseHoverStyle: {
                ...commonStyle.mouseHoverStyle
            },

            mouseDownStyle: {
                ...commonStyle.mouseDownStyle
            },

            imageContainer: {
                ...commonStyle.imageContainer
            },

            csbTypeLabel: {
                ...commonStyle.csbTypeLabel
            },

            typeSelected: {
                ...commonStyle.typeSelected
            },

            csbTypeIcon: {
                height: 64,
                width: 64
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
