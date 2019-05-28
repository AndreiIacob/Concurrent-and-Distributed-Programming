import { Dimensions } from 'react-native';
import * as actionTypes from './../actions';

const initialState = {
    breakpoint: actionTypes.updateBreakpoint(Dimensions.get('window').width).breakpoint
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_BREAKPOINT: {
            return {
                ...state,
                breakpoint: action.breakpoint
            }
        }
        default:
            return state;
    }
};
export default reducer;