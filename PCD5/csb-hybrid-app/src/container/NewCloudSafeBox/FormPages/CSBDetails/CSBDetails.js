import React from 'react';
import { Picker, Text, TextInput, View, Image, FlatList, TouchableHighlight } from "react-native";
import style from "../../NewCloudSafeBox.style";

const csbDetails = (props) => {
    return (
        <View>
            <View style={style.Container}>
                <Text style={style.Label}>CSB name</Text>
                <TextInput style={style.TextInput} value={props.csbName}
                    onChangeText={props.nameUpdateHandler} />
            </View>

            <View style={style.Container}>
                <Text style={style.Label}>CSB Type</Text>

                <Picker
                    style={style.TextInput}
                    selectedValue={props.defaultValue}
                    onValueChange={props.onTypeChange}
                >
                    {props.types.map(option => (
                        <Picker.Item
                            key={`${option.label}_${option.value}`}
                            label={option.label}
                            value={option.value}
                        />
                    ))}</Picker>

            </View>

            <FlatList
                    style={{ margin: 10 }}
                    horizontal={true}
                    data={props.icons}
                    key={({ item }) => item.name}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => props.onPressIcon(item)}>
                            <Image
                                style={style.image}
                                source={item.icon}
                                resizeMode="contain" />
                        </TouchableHighlight>
                    }
                />
        </View>
    );
}

export default csbDetails;