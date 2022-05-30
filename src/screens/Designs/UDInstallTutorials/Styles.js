import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../utilities/constants';
import { commonStyle } from '../../../utilities/constants';

const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor,
        overflow: 'hidden'
    },
    
    listWholeViewStyle: {
        marginHorizontal: 20,
        marginBottom: 71.64
    },

   buttonViewStyle: {
        marginBottom: 33,
        marginHorizontal: null
   },

    listViewHeadingTextStyle:{
        fontSize: 20,
        color: colors.lightGreenColor,
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'center',
        alignSelf: 'center'
    },

    normalTextStyle: {
        fontSize: 18,
        color: colors.white1,
        marginBottom: 20,
        ...commonStyle.fontInRegularStyle
    },

});

export default styles;