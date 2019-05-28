import { StyleSheet } from 'react-native';
import { commons } from './Commons.style';

export default class Medium {
    static getSheet() {
        return StyleSheet.create({
            // Application style
            appContainer: {
                ...commons.appContainer
            },

            appWrapper: {
                ...commons.appWrapper
            },
            // End Application style

            // Side bar style
            sidebarContainer: {
                ...commons.sidebarContainer,
                width: 220
            },

            sidebarOverlay: {
                ...commons.sidebarOverlay,
                width: '100%'
            },

            sidebarWrapper: {
                ...commons.sidebarWrapper
            },

            sideBarMenuContainer: {
                ...commons.sideBarMenuContainer
            },

            sideBarVersion: {
                ...commons.sideBarVersion
            },
            // End Side bar style

            // Content style
            mainContentContainer: {
                ...commons.mainContentContainer
            },

            breadcrumb: {
                ...commons.breadcrumb
            },
        
            breadcrumbText: {
                ...commons.breadcrumbText
            },

            dashboardWizardWrapper: {
                ...commons.dashboardWizardWrapper,
            },
    
            mainPanel: {
                ...commons.mainPanel,
                height: '100%'
            },
        
            panel: {
                ...commons.panel
            },
        
            title: {
                ...commons.title,
            },
        
            panelContent: {
                ...commons.panelContent,
            }
            // End content style
        });
    }

    static getVisualPreferences(){
        return {
            COLUMN_NUMBER_FOR_DASHBOARD_LISTED_CSBS:6
        }
    }
}