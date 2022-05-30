import React, { Component } from 'react';
import { Image, Animated, View } from 'react-native';
import { alertIcon } from '../../utilities/assets';
import { colors } from '../../utilities/constants';

class AlertBoxBell extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }

    runAnimation() {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 300
        }).start(() => this.runOpposite());
    }

    runOpposite() {
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 300
        }).start(() => this.runAnimation());

    }


    render() {
        this.runAnimation();
        const interpolateRotation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['-15deg', '15deg']
        });
        const animatedStyle = {
            transform: [
                { rotate: interpolateRotation }
            ]
        }


        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <Animated.View
                    style={animatedStyle}
                >
                    <Image
                        source={alertIcon}
                        style={{
                            tintColor: colors.themeBackgroundColor
                        }}
                    />
                </Animated.View>
            </View>
        )

    }
}

export { AlertBoxBell };
