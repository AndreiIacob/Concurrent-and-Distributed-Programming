import { StyleSheet } from 'react-native';
import { commonStyle } from './Common.style';

export default class StyleSheetFactory {
    static getSheet() {
        return StyleSheet.create({
            wizardContent: {
                ...commonStyle.wizardContent,
                height: 55
            },

            wizardStep: {
                ...commonStyle.wizardStep
            },

            wizardSmallStep: {
                width: 32,
                height: 32,
                borderRadius: 16,
                top: 3
            },

            wizardStepText: {
                ...commonStyle.wizardStepText
            },

            wizardStepTextSmall: {
                ...commonStyle.wizardStepText,
                paddingTop: 6,
                paddingLeft: 12
            },

            stepUncompleted: {
                ...commonStyle.stepUncompleted
            },

            stepCompleted: {
                backgroundColor: "rgba(0, 148, 76, 0.9)"
            },
            
            stepCurrent: {
                ...commonStyle.stepCurrent
            },

            isCurrent: {
                ...commonStyle.isCurrent
            }
        });
    }
}