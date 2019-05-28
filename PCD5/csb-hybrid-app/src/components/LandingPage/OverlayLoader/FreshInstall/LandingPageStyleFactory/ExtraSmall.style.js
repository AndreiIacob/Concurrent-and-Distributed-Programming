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
                fontSize: 20
            },

            guidelines: {
                ...commonStyle.guidelines,
                fontSize: 14
            },

            guidelinesLink: {
                ...commonStyle.guidelinesLink,
                fontSize: 14
            },

            icon: {
                width: 60,
                height: 60
            },

            image: {
                ...commonStyle.image
            },

            itemContainer: {
                ...commonStyle.itemContainer
            },
        
            itemTextContainer: {
                ...commonStyle.itemTextContainer,
                fontSize: 14
            }
        });
    }
}