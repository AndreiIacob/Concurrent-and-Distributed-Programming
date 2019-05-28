
import React from 'react';
import { View, Text, TouchableHighlight, ListView, Button } from 'react-native';
import classes from "./DrawerContainer.style"
import ProfileSummary from './../../../components/Profile/ProfileSummary/ProfileSummary'
import ExpandableMenu from './../../../components/Menu/ExpandableMenu/ExpandableMenu'
import MenuItem from './../../../components/Menu/MenuItem/MenuItem'



export default dashboard = (props) => {

    const menuItems = [{
        name: "Create a new CSB",
        // icon: (<Icon name="plus-square" size={20} color="#FF9F01"/>),
        to: {native:'NewCloudSafeBox'}
    },
    {
        name: "Restore a CSB",
        // icon: (<Icon name="cloud-download" size={20} color="#FF9F01"/>),
        to: {native:'NewCloudSafeBox'}
    },
    ];

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(menuItems);

    // console.log(this.props);
    return (
        <View style={classes.Container}>

            <ProfileSummary
                name={props.user.name}
                avatarType={'./../../assets/global/images/masks/anonymous.png'}
            />

            <ExpandableMenu data={props.user.safeBoxes} title={props.user.safeBoxes.length.toString() + " Cloud Safe Boxes"} />

            <ListView
                style={classes.Container}
                dataSource={dataSource}
                renderRow={(data) => <MenuItem navigation={props.navigation} data={data} />}
            />

            <TouchableHighlight style={classes.CloseDrawerButton}>
                <Text onPress={props.closeHandler}>{'Close The Drawer'}</Text>
            </TouchableHighlight>

        </View>
    )

}

