export const SET_CSB_TITLE = "SET_TITLE";
export const SET_CSB_ICON = "SET_CSB_ICON";
export const SET_CSB_TYPE = "SET_CSB_TYPE";
export const NAVIGATE = "NAVIGATE";
export const RESET = "RESET";


export const setCSBTitle = (title) => {
    return {
        type: SET_CSB_TITLE,
        title: title
    }
};

export const setCSBIcon = (item) => {
    // console.log('item', item);
    return {
        type: SET_CSB_ICON,
        icon: item
    }
};

export const changedCSBType = (csbType) => {
    return {
        type: SET_CSB_TYPE,
        csbType: csbType
    }
};

export const navigate = (nextCommand) => {
    return {
        type: NAVIGATE,
        nextCommand: nextCommand
    }
};

export const resetStore = () => {
    return {
        type: RESET
    }
};