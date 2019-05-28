import * as actionTypes from './actions';

function initialState() {
    return {
        seed: "",
        saveSeed: true
    };
}

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case actionTypes.SET_MASTER_CSB_SEED:
            return {
                ...state,
                seed: action.seed
            };
        case actionTypes.TOGGLE_SAVE_SEED: {
            let seedIsSaved = state.saveSeed;
            return {
                ...state,
                saveSeed: !seedIsSaved
            };
        }
        default:
            return state;
    }

};
export default reducer;