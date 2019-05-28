import React from 'react';
import { View, FlatList } from 'react-native';

import CSBItem from '../CSBItem/CSBItem';
import LoaderWrapper from '../../hoc/LoaderWrapper/LoaderWrapper';

const CSBChildrenContainer = (props) => {
    const formatData = (data, numColumns) => {
        let resultData = [...data];
        let numberOfElementsLastRow = resultData.length % numColumns;
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            resultData.push({ empty: true });
            numberOfElementsLastRow++;
        }
        return resultData;
    };

    const renderKey = (item, index) => {
        if (item.empty) {
            return 'empty' + index;
        }
        return item.to.web + index
    };

    const renderItem = ({ item }) => <CSBItem {...props} payload={item} empty={item.empty} />;

    let dataToFormat = [...props.safeBoxes];
    dataToFormat = props.files ? dataToFormat.concat(props.files) : dataToFormat;

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <LoaderWrapper isLoaded={props.isLoaded}>
                <FlatList
                    data={formatData(dataToFormat, props.csbsPerPage)}
                    renderItem={renderItem}
                    keyExtractor={renderKey}
                    numColumns={props.csbsPerPage}
                />
            </LoaderWrapper>
        </View>
    );
};

export default CSBChildrenContainer;