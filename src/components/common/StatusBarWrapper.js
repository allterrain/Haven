import React, { Component } from 'react';
import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { appData } from '../../utilities/constants/appData';
import { colors } from '../../utilities/constants';
class StatusBarWrapper extends Component {

    render() {
        const styles = {
            wholeViewStyle: {
                height: getStatusBarHeight(),
                backgroundColor: colors.white1
            }
        }

        return (
            <View
                style={styles.wholeViewStyle}
            />              
        )
    }
}



export { StatusBarWrapper };