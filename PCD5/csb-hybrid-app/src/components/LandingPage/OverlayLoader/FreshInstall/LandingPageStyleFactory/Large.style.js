import { StyleSheet } from 'react-native';
import { commonStyle } from './Common.style';

export default class StyleSheetFactory {
    static getSheet() {
        return StyleSheet.create({
            firstActionContainer: {
                ...commonStyle.firstActionContainer
            },

            overlay: {
                ...commonStyle.overlay
            },

            container: {
                ...commonStyle.container
            },

            welcomeMessage: {
                ...commonStyle.welcomeMessage
            },

            guidelines: {
                ...commonStyle.guidelines
            },

            guidelinesLink: {
                ...commonStyle.guidelinesLink
            },

            image: {
                ...commonStyle.image
            },

            icon: {
                ...commonStyle.icon
            },

            itemContainer: {
                ...commonStyle.itemContainer
            },
        
            itemTextContainer: {
                ...commonStyle.itemTextContainer
            }
        });
    }
}