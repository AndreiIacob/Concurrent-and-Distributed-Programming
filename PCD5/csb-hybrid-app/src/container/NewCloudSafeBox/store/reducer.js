import * as actionTypes from './actions';
import InteractionsManager from '../../../services/InteractionsManager';

let InteractionSpace = InteractionsManager.getInstance();

const auxiliaryState = {
    pages: ['details', 'recovery_phrase', 'finished']
};


function initialState () {
    return {

        options: [
            {
                label: "Medical files",
                value: "medical"
            },
            {
                label: "Financial status",
                value: "financial"
            },
            {
                label: "Daily costs",
                value: "costs"
            }
        ],
        testValue: "testValue",
        csbType: "medical",
        csbName: "",
        csbIcon: {},
        recoveryPhrase: "",
        csbPath:"",
        currentPage: auxiliaryState.pages[0],
        pages: auxiliaryState.pages,
        icons: [
            {
                icon: require('../../../assets/global/images/csb-types/confidential.png'),
                name: 'confiedential',
                color: 'black'
            },
            {
                icon: require('../../../assets/global/images/csb-types/medical.png'),
                name: 'medical',
                color: 'black'
            },
            {
                icon: require('../../../assets/global/images/csb-types/password.png'),
                name: 'password',
                color: 'black'
            },
            {
                icon: require('../../../assets/global/images/csb-types/family.png'),
                name: 'family',
                color: 'black'
            }
        ],
    };
}

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.SET_CSB_TITLE:
            return {
                ...state,
                csbName: action.title
            };
        case actionTypes.SET_CSB_TYPE:
            return {
                ...state,
                csbType: action.csbType
            };
        case actionTypes.SET_CSB_ICON:
            return {
                ...state,
                csbIcon: action.csbIcon
            };
        case actionTypes.NAVIGATE:
            let currentIndex = auxiliaryState.pages.findIndex((page) => {
                return page === state.currentPage;
            });
            let pageIndex = action.nextCommand === true ? 1 : -1;


            InteractionSpace.createCSB(state.csbName, function(err, csb){
                if(!err){

                }
            });

            return {
                ...state,
                currentPage: auxiliaryState.pages[currentIndex + pageIndex]
            };
        case actionTypes.RESET:
            const is = initialState();
            Object.keys(is).forEach(key => {
                state[key] = is[key];
            });
            return state;
        default:
            return state;
    }

};
export default reducer;
