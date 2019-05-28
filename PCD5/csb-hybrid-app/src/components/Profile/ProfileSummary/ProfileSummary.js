import React from 'react';
import { View, Image, Text } from 'react-native';
import classes from './ProfileSummary.style';

const profileSummary = props => {

    return (
        <View>
            <View>
                <View style={classes.ImageContainer}>

                    {<Image style={classes.Image}
                                source={require("../../../assets/global/images/masks/freaky-monkey.png")} />}
                </View>
                <View>
                    <Text style={classes.Name}>{props.name}</Text>
                </View>
            </View>
        </View>
    )
}

export default profileSummary;