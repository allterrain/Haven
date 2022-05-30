import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { colors } from '../../utilities/constants';
import { HavenLogo } from '../../utilities/assets';

const onButtonPress = (props) => {
    if(props.navigating) {
        props.navigating.popToTop();
    }
}

const Header = (props) => {

    const styles = {
        wholeViewStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.white1,
            paddingVertical: 10,
        },
    }
    
    return (
        <View style={styles.wholeViewStyle}>
            <TouchableOpacity 
                onPress={() => onButtonPress(props)}
                activeOpacity={0.99}
            >
                <Image
                    source={HavenLogo}
                />
            </TouchableOpacity>
        </View>
    )
}

export { Header };