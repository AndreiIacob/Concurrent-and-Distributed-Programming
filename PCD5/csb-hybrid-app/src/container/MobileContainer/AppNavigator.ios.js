import  React from 'react';
import {NavigatorIOS, Text, ScrollView, TouchableHighlight, Dimensions,TouchableOpacity} from 'react-native';
import {createStackNavigator,createDrawerNavigator} from "react-navigation";
import NewCloudSafeBox from "../NewCloudSafeBox/NewCloudSafeBox";
import Wizard from "../../components/LandingPage/Wizard/Wizard";
import SideDrawer from "./SideDrawer/SideDrawer";
import MobileAppContainer from "./MobileAppContainer";
import IOSIcon from "react-native-vector-icons/Ionicons";


const drawerScreens = createDrawerNavigator({
    Category: MobileAppContainer,
    Products: MobileAppContainer,
}, {
    initialRouteName: 'Category'
})


const AppNavigator = createStackNavigator({
    MobileAppContainer:{
        screen:MobileAppContainer,
        navigationOptions: ({navigation}) => ({
            title: "Main",
            headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Text>||</Text>
                    <IOSIcon name="ios-menu" size={30} />
                </TouchableOpacity>
            ),
            headerStyle: { height:30, width:300, backgroundColor:"red" }
        })
    },
    drawer:{screen:drawerScreens},
    NewCloudSafeBox: { screen: NewCloudSafeBox },
    Wizard:{screen:Wizard}
}, {
    contentComponent: SideDrawer,
    initialRouteName: 'drawer',
    drawerWidth: Dimensions.get('window').width - 120,
});
export default AppNavigator;