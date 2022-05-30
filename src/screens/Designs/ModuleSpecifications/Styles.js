import { StyleSheet } from 'react-native';
import { colors } from '../../../utilities/constants';
import { commonStyle } from '../../../utilities/constants';

const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor
    },
    normalTextStyle: {
        fontSize: 20,
        color: colors.white1,
        marginBottom: 20,
        ...commonStyle.fontInRegularStyle
    },

});

export default styles;