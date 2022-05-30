import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../utilities/constants';
import { commonStyle } from '../../../utilities/constants';

const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor
    },

    
    
    listWholeViewStyle: {
        marginHorizontal: 20
    },

    listHeadingValueViewStyle: {
        marginBottom: 30
    },

    listViewHeadingTextStyle:{
        fontSize: 20,
        color: colors.lightGreenColor,
        lineHeight: 30,
        marginBottom: 10
    },

    normalTextStyle: {
        fontSize: moderateScale(18),
        color: colors.white1,
        ...commonStyle.fontInRegularStyle
    },

    lastDataViewStyle: {
        marginBottom: 69
    },



});

export default styles;