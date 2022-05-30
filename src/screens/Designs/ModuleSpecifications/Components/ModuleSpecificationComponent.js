import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { lampOutlineIcon, fanIcon, bulbIcon, ledIcon } from '../../../../utilities/assets';
import { ModuleEachComponent } from './ModuleEachComponent';

let listData = [
    { icon: lampOutlineIcon, title: 'fl' },
    { icon: fanIcon, title: 'fan' },
    { icon: bulbIcon, title: 'light' },
    { icon: ledIcon, title: 'led' },
];

const ModuleSpecificationComponent = (props) => {
    return (
        <View style={styles.wholeViewStyle}>
            <FlatList
                data={listData}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={false}
                renderItem={({ item, index }) =>
                    <ModuleEachComponent
                        device={props.device}
                        item={item}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
    wholeViewStyle: {
        flex: 1
    },
})

export { ModuleSpecificationComponent };