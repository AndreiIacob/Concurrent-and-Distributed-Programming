import * as actionTypes from './../actions';

const initialState = {
    appReady: false,
    isFreshInstall: false,
    user: {
        name: "Anonymous Monkey",
        profilePic: 'freaky-monkey',
        safeBoxes: []
    },
    displayPinModal: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_IS_LOADING:
            return {
                ...state,
                appReady: action.isLoading
            };
        case actionTypes.ADD_CSB:
            let newSafeBoxesList = state.user.safeBoxes.slice();
            newSafeBoxesList.splice(newSafeBoxesList.length - 1, 0, action.csb);

            return {
                ...state,
                user: {
                    ...state.user,
                    safeBoxes: newSafeBoxesList
                }
            };
        case actionTypes.IS_FRESH_INSTALL:
            return {
                ...state,
                isFreshInstall: action.isFresh
            };
        case actionTypes.LOAD_CSB_NAME:
            let csbs = action.csbs.csbs;
            let safeBoxesList = [];

            csbs.forEach((csb) => {
                safeBoxesList.push({
                    name: csb,
                    icon: {
                        name: "lock",
                        color: "#d7163a"
                    },
                    to: {
                        web: '/csb/' + csb,
                        native: 'CloudSafeBoxDetails'
                    }
                });
            });

            return {
                ...state,
                user: {
                    ...state.user,
                    safeBoxes: safeBoxesList
                }
            };

        default:
            return state;
    }
};
export default reducer;
