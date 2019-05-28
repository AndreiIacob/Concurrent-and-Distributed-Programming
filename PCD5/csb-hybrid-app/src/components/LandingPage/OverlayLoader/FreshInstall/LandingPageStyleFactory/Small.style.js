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
                ...commonStyle.container,
                width: '100%',
                height: '100%'
            },

            welcomeMessage: {
                ...commonStyle.welcomeMessage,
                fontSize: 22
            },

            guidelines: {
                ...commonStyle.guidelines,
                fontSize: 16
            },

            guidelinesLink: {
                ...commonStyle.guidelinesLink,
                fontSize: 16
            },

            icon: {
                width: 90,
                height: 90
            },

            image: {
                ...commonStyle.image
            },

            itemContainer: {
                ...commonStyle.itemContainer
            },
        
            itemTextContainer: {
                ...commonStyle.itemTextContainer,
                fontSize: 16
            }
        });
    }
}