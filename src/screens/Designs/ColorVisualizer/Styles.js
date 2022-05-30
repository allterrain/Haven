import { StyleSheet } from 'react-native';
import { moderateScale  } from 'react-native-size-matters';
import { colors } from '../../../utilities/constants';
import { commonStyle } from '../../../utilities/constants';

const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor
    },

    normalTextStyle: {
        fontSize: 19,
        color: colors.white1,
        marginBottom: 22,
        textAlign: 'center',
        ...commonStyle.fontInRegularStyle
    },

    coloredTextStyle: {
        color: colors.yellowColor,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 24,
        ...commonStyle.fontInBoldStyle
    },

    linkTextStyle: {
        fontSize: 20,
        marginHorizontal: 15
    }

});

export default styles;