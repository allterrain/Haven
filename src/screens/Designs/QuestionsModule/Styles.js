import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { colors } from '../../../utilities/constants';


const styles = StyleSheet.create({
    wholeViewStyle: {
        flex: 1,
        backgroundColor: colors.themeBackgroundColor,
    },

    allButtonssTopViewStyle: {
        marginVertical: 69,      
    },

    scrollViewStyle: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },

    buttonViewStyle: {
        marginBottom: 50
    }


});

export default styles;