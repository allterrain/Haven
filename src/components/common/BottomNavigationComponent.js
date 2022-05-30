import React from 'react';
import {
    View,
    Image,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { colors } from '../../utilities/constants';


const BottomNavigationComponent = (props) => {

    const styles = {
        wholeViewStyle: {
            backgroundColor: colors.lightBlueColor,
            height: 60,
            alignItems: 'center',
            opacity: 2,
            elevation: 3,
            shadowColor: "#00000033",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            
        },

        iconContainerStyle: {
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.yellowColor,
        },

        iconsWholeViewStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: -25
        },

        secondIconViewStyle: {
            marginLeft: 20
        }
    }

    return (
        <View style={styles.wholeViewStyle}>
            <View style={styles.iconsWholeViewStyle}>
                {
                    (props.firstIcon)&&
                    <Ripple 
                        rippleContainerBorderRadius={25}
                        onPress={() => props.onFirstIconPress()}
                        style={styles.iconContainerStyle}
                    >
                        <Image source={props.firstIcon}
                        />
                    </Ripple>
                }
            </View>
        </View>
    )
}

export { BottomNavigationComponent };