import { StyleSheet } from 'react-native';
import { commonStyle } from './Common.style';

export default class StyleSheetFactory {
    static getSheet() {
        return StyleSheet.create({
            wizardContent: {
                ...commonStyle.wizardContent
            },
        
            wizardStep: {
                ...commonStyle.wizardStep
            },
        
            wizardStepText: {
                ...commonStyle.wizardStepText
            },
        
            stepUncompleted: {
                ...commonStyle.stepUncompleted
            },
        
            stepCompleted: {
                backgroundColor: "#6b8ec6"
            },
        
            isCurrent: {
                ...commonStyle.isCurrent
            },
            
            stepCurrent: {
                ...commonStyle.stepCurrent
            },
        
            grayLine: {
                height: 2,
                marginTop: -19,
                zIndex: -2,
                backgroundColor: "#CCC"
            },
        
            "line-flex-start": {
                backgroundColor: "#6b8ec6",
                width: "100%"
            },
        
            "line-center": {
                width: "100%"
            },
        
            "line-flex-end": {
                width: "100%"
        
            }
        });
    }
}