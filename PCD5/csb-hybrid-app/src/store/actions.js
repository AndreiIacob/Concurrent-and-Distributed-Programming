import InteractionsManager from '../services/InteractionsManager';
import { AsyncStorage } from "react-native";

import AttachFileModal from "../components/Modal/Popups/AttachFile";
import NewCSBModal from "../components/Modal/Popups/NewCSB";
import AttachCSBModal from "../components/Modal/Popups/AttachCSB"
import ContractForm from "../components/Modal/Popups/ContractForm"

export const UPDATE_BREAKPOINT = "UPDATE_BREAKPOINT";
export const ADD_CSB = "ADD_CSB";
export const LOAD_CSB_NAME = "LOAD_CSB_NAME";
export const APP_IS_LOADING = "APP_IS_LOADING";
export const IS_FRESH_INSTALL = "IS_FRESH_INSTALL";

export const csbItemImage = require('../assets/global/images/csb_item.png');
export const csbAssetImage = require('../assets/global/images/csb_file.png');


export const validators = {

    csb_name: {
        type: "regex",
        expression: /(^[A-Za-z0-9-_&,\s]+)$/gm,
        message: "Your CSB name is invalid."
    },

};

export const wizardPages = [
    {
        pageName: 'backup',
        pageIndex: 0,
        singleChoice: false,
        hasPrev: false,
        canPrev: false
    },
    {
        pageName: 'type',
        pageIndex: 1,
        singleChoice: false,
        hasPrev: false,
        canPrev: false
    },
    {
        pageName: 'seed',
        pageIndex: 2,
        hasPrev: false,
        canPrev: false
    },
    {
        pageName: 'pin',
        pageIndex: 3,
        hasPrev: false,
        canPrev: false
    },
    {
        pageName: 'finish',
        pageIndex: 4,
        singleChoice: false,
        hasPrev: true,
        canPrev: true
    }
];

export const dashboardPages = [
    {
        pageName: 'name',
        pageIndex: 0,
        hasPrev: false,
        canPrev: false
    },
    {
        pageName: 'type',
        pageIndex: 1,
        singleChoice: true,
        hasPrev: false,
        canPrev: false
    }
];

export const csbActions = [
    {
        actionName: 'New CSB',
        actionPathName: '/new-csb',
        actionColor: '#ffffff',
        actionTextColor: '#000000',
        modalComponent: NewCSBModal
    },
    {
        actionName: 'Attach CSB',
        actionPathName: '/attach-csb',
        actionColor: '#1baf46',
        actionTextColor: '#ffffff',
        modalComponent: AttachCSBModal
    },
    {
        actionName: 'Attach File',
        actionPathName: '/attach-file',
        actionColor: '#2c7daf',
        actionTextColor: '#ffffff',
        modalComponent: AttachFileModal
    },
    {
        actionName: 'Share',
        actionPathName: '/share',
        actionColor: '#ffffff',
        actionTextColor: '#000000'
    },
    {
        actionName: 'Receive',
        actionPathName: '/receive',
        actionColor: '#ffffff',
        actionTextColor: '#000000'
    },
    {
        actionName: 'Assets',
        actionPathName: '/assets',
        actionColor: '#ffffff',
        actionTextColor: '#000000'
    },
    {
        actionName: 'Delete',
        actionPathName: '/delete',
        actionColor: '#d75050',
        actionTextColor: '#ffffff'
    },
    {
        actionName: 'Create Contract',
        actionPathName: '/contract/create',
        actionColor: '#f6ff00',
        actionTextColor: '#000000',
        modalComponent: ContractForm,
    },
];

export const checkbox = {
    checked: require('../assets/global/images/checkbox_checked.png'),
    unchecked: require('../assets/global/images/checkbox_unchecked.png')
};

export const types = [{
    icon: require("../assets/global/images/csb-types/medical.png"),
    name: "Medical"
}, {
    icon: require("../assets/global/images/csb-types/financial.png"),
    name: "Financial"
}, {
    icon: require("../assets/global/images/csb-types/education.png"),
    name: "Education",
}, {
    icon: require("../assets/global/images/csb-types/patent.png"),
    name: "Patent"
}, {
    icon: require("../assets/global/images/csb-types/article.png"),
    name: "Article"
}, {
    icon: require("../assets/global/images/csb-types/incomes.png"),
    name: "Incomes"
}, {
    icon: require("../assets/global/images/csb-types/password.png"),
    name: "Passwords"
}, {
    icon: require("../assets/global/images/csb-types/expenses.png"),
    name: "Expenses"
}];

export const updateBreakpoint = (width, height) => {
    let breakpoint = null;

    if (width < 600) breakpoint = 'XS';
    else if (width < 900) {
        breakpoint = width > height ? 'XS' : 'S';
    }
    else if (width < 1200) breakpoint = 'M';
    else breakpoint = 'L';

    return {
        type: UPDATE_BREAKPOINT,
        breakpoint: breakpoint
    }
}

const InteractService = InteractionsManager.getInstance();

export const setLoadingState = (isLoading) => {

    return {
        type: APP_IS_LOADING,
        isLoading: isLoading
    }
};

export const setAsFreshInstall = (isFreshInstall) => {
    return {
        type: IS_FRESH_INSTALL,
        isFresh: isFreshInstall
    }
};

export const storeCSBlist = (result) => {
    return {
        type: LOAD_CSB_NAME,
        csbs: result
    }
}
export const getCSBsList = (csbsPath) => {
    return dispatch => {
        InteractService.getCsbNames(csbsPath, (err, csbs) => {
            if (!err) {
                dispatch(storeCSBlist(csbs));
            }
        })
    }
}

export const addCSB = (csb) => {

    let newCsb = {
        name: csb.name,
        icon: {
            name: "lock",
            color: "#d78dcd"
        },
        id: "rndId",
        to: {
            web: '/csb/' + csb.name.replace('/ /g', "-"),
            native: 'CloudSafeBoxDetails'
        }
    };
    return {
        type: ADD_CSB,
        csb: newCsb
    }
};


/**
 * Local Storage Utilities
 */
export const getLocalStorageForNameAsJSON = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

export const updateLocalStorageForName = async (key, newValue) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
        return null;
    }
}

export const removeItemFromLocalStorage = async (key, objKey) => {
    const value = await getLocalStorageForNameAsJSON(key);
    if (value === null) return false;
    if (value.hasOwnProperty(objKey)) {
        delete value[objKey];
        updateLocalStorageForName(key, value);
    }
}

export const isPartOfCsbCreation = async (key) => {
    const value = await getLocalStorageForNameAsJSON(key);
    if (value === null) return false;
    return value.hasOwnProperty('completed') && value['completed'] === false
}
/**
 * End Local Storage Utilities
 */
