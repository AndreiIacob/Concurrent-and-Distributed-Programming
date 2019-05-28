import { createStackNavigator } from 'react-navigation';
import MobileAppContainer from './MobileAppContainer';
import NewCloudSafeBox from './../NewCloudSafeBox/NewCloudSafeBox';
import CloudSafeBoxDetails from './../CloudSafeBoxDetails/CloudSafeBoxDetails';
import DefaultRecordList from './../CloudSafeBoxDetails/DefaultRecordList/DefaultRecordList';
import DefaultRecordView from './../CloudSafeBoxDetails/DefaultRecordView/DefaultRecordView';
import Wizard from './../../components/LandingPage/Wizard/Wizard';

const AppNavigator = createStackNavigator({
    MobileAppContainer: {
        screen: MobileAppContainer,
        // navigationOptions: {
        //     header: {
        //         visible: false
        //     }
        // }
    },
    NewCloudSafeBox: { screen: NewCloudSafeBox },
    CloudSafeBoxDetails: { screen : CloudSafeBoxDetails },
    DefaultRecordList: { screen : DefaultRecordList },
    DefaultRecordView: { screen : DefaultRecordView },
    Wizard:{screen:Wizard}
});

export default AppNavigator;