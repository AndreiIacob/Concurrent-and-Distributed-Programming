import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import style from './CSBItem.style';
import {csbItemImage, csbAssetImage} from '../../store/actions';
import AbstractNavigation from '../Navigation/AbstractNavigation/AbstractNavigation';
import SimpleWrapper from "../../hoc/SimpleWrapper";

/**
 * CSBItem component is used to display the minimal information about the list of CSBs which the user holds
 * These this.props are: Title (displayed after image) and URL to full details
 * By clicking the item, the user will navigate to the full detailed component (CSBDetailedItem)
 * @param {*} this.props
 */
class CSBItem extends React.Component {

    state = {
        moreDetailsRequired: false
    };

    componentWillUnmount(){
        clearTimeout(this.timeoutId);
    }

    onMouseEnter() {
        this.timeoutId = setTimeout(() => {
            this.setState({
                moreDetailsRequired: true
            })
        }, 500);
    }

    onMouseLeave() {
        clearTimeout(this.timeoutId);
        this.setState({
            moreDetailsRequired: false
        })
    }

    render() {
        let item = null;
        let csb = null;
        if (!this.props.empty) {

            let longDetails = null;
            if (this.state.moreDetailsRequired) {
                longDetails = <View style={style.csbDetails}>
                    <Text style={style.csbTextDetails}
                          numberOfLines={1}>{this.props.payload.name}
                    </Text>
                </View>
            }

            const csbView = (<SimpleWrapper>
                <Image
                    style={style.csbImage}
                    source={this.props.payload.type === 'asset' ? csbAssetImage : csbItemImage}/>

                <Text
                    style={style.csbName}>{this.props.payload.name.length > 15 ? this.props.payload.name.substring(0, 12) + "..." : this.props.payload.name}</Text>
                {longDetails}
            </SimpleWrapper>);

            item = (
                <TouchableOpacity style={style.item} onPressOut={() => {
                    if (this.props.payload.type === 'asset') {
                        this.props.assetOpenModal(this.props.payload.name);
                    }
                }}>
                    {csbView}
                </TouchableOpacity>
            );


            csb = (
                <AbstractNavigation
                    style={[style.item, {marginTop: 5, marginBottom: 5, padding: 5}]}
                    to={this.props.payload.to}
                    payload={this.props.payload}
                    sendPayload={true}>
                    {csbView}
                </AbstractNavigation>
            );
        }
        return this.props.empty === true
            ? <View style={[style.itemContainer, style.itemInvisible]}/>
            : (
                <View style={style.itemContainer}
                      onMouseLeave={() => this.onMouseLeave()} onMouseEnter={() => this.onMouseEnter()}>
                    {this.props.payload.type === 'asset' ? item : csb}
                </View>
            )
    }
};

export default CSBItem;
