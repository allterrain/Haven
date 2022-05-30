import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { colors } from '../../utilities/constants';
import { commonStyle } from '../../utilities/constants';

const ScreenNameComponent = (props) => {
    const { fontInBoldStyle } = commonStyle;
    const styles = {
        wholeViewStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: verticalScale(23),
            marginHorizontal: scale(20)
        },

        screenTitleTextStyle: {
            fontSize: 24,
            color: colors.white1,
            textAlign: 'center',
            lineHeight: 30
        }
    }

    return (
        <View style={styles.wholeViewStyle}>
            <Text style={[styles.screenTitleTextStyle, fontInBoldStyle]}>
                {props.title}
            </Text>
        </View>
    )
}

export { ScreenNameComponent };