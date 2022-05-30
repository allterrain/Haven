import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
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

    troubleShootbuttonViewStyle: {
        marginBottom: 38
    },

    pdfButtonViewStyle: {
        marginBottom: 60
    },

    listViewHeadingTextStyle:{
        fontSize: 22,
        color: colors.lightGreenColor,
        marginBottom: 10,
    },

    normalTextStyle: {
        fontSize: 20,
        color: colors.white1,
        marginBottom: 20,
        ...commonStyle.fontInRegularStyle
    },



});

export default styles;