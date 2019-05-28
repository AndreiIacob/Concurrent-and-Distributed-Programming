import { combineReducers, createStore, applyMiddleware } from "redux";
import appReducer from "./reducers/appReducer";
import appSettings from './reducers/appSettings';
import newCSBReducer from "../container/NewCloudSafeBox/store/reducer";
import wizardReducer from "../components/LandingPage/Wizard/store/reducer";
import CSBDetailsReducer from "./../container/CloudSafeBoxDetails/store/reducer";
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    global: appReducer,
    settings: appSettings,
    newCSB: newCSBReducer,
    wizard: wizardReducer,
    CSBDetailsReducer: CSBDetailsReducer,

});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;