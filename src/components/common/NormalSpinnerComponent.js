import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { appData } from '../../utilities/constants';
import { colors } from '../../utilities/constants';

class NormalSpinnerComponent extends Component {

    render() {

        return(
            <View
                style={styles.wholeViewStyle}
            >
                <View
                    style={styles.componentOuterViewStyle}
                >

                    <ActivityIndicator
                        size={'small'}
                        color={colors.gray1}
                    />

                    <Text
                        style={styles.textStyle}
                    >
                        Please Wait...
                    </Text>


                </View>
            
                  

             
            </View>
        )
    }
}


const styles = {

    wholeViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    componentOuterViewStyle: {
        paddingVertical: 9,
        paddingLeft: 20,
        marginBottom: 20,
        width: appData.screenWidth - 130,
        backgroundColor: colors.blue1,
        flexDirection: 'row',
        borderRadius: 6,
        alignSelf: 'center',
        alignItems: 'center',
     
    },

    textStyle: {
        fontSize: 15,
        color: colors.white1,
        marginLeft: 17
    }
}

export { NormalSpinnerComponent };