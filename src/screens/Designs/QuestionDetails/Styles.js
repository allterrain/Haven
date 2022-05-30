import { StyleSheet } from 'react-native';
import { colors } from '../../../utilities/constants';
import { commonStyle } from '../../../utilities/constants';

const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor
    },

    innerViewStyle: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 25
    },

    normalTextStyle: {
        fontSize: 19,
        color: colors.white1,
        marginBottom: 20,
        textAlign: 'center',
        ...commonStyle.fontInRegularStyle
    },

    coloredTextStyle: {
        color: colors.yellowColor,
        marginBottom: 10,
        ...commonStyle.fontInBoldStyle
    }

});

export default styles;