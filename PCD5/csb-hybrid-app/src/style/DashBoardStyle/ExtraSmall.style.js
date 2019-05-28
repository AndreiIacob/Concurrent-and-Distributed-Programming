import { StyleSheet } from 'react-native';
import { commons } from './Commons.style';

export default class ExtraSmall {
    static getSheet() {
        return StyleSheet.create({
            // Application style
            appContainer: {
                ...commons.appContainer,
                borderWidth: 0
            },

            appWrapper: {
                ...commons.appWrapper,
                width: '100%',
                height: '100%',
                borderWidth: 0
            },
            // End Application style

            // Side bar style
            sidebarContainer: {
                ...commons.sidebarContainer,
                zIndex: 100,
                position: 'absolute',
                borderWidth: 0
            },

            sidebarOverlay: {
                ...commons.sidebarOverlay,
                width: '80%'
            },

            sidebarWrapper: {
                ...commons.sidebarWrapper
            },

            sideBarMenuContainer: {
                ...commons.sideBarMenuContainer
            },

            sideBarVersion: {
                ...commons.sideBarVersion,
                borderWidth: 0
            },

            toggleMenuContainer: {
                ...commons.toggleMenuContainer
            },

            menuIcon: {
                ...commons.menuIcon
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
            },

            panel: {
                ...commons.panel,
                height: '100%'
            },

            title: {
                ...commons.title
            },

            panelContent: {
                ...commons.panelContent
            }
            // End content style
        });
    };

    static getVisualPreferences() {
        return {
            COLUMN_NUMBER_FOR_DASHBOARD_LISTED_CSBS: 2
        }
    }

}