import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TouchableView } from './TouchableView';
import { colors } from '../../utilities/constants';
import { commonStyle } from '../../utilities/constants';

class Button extends Component {

    componentDidMount() {
        this.animatedValue = new Animated.Value(0);
    }

    onButtonPressAnimation() {
        this.animatedValue.setValue(0)
        Animated.timing(this.animatedValue, {
            toValue: 2,
            duration: 400
        }).start();
       
    }

    render() {
        const { fontInRegularStyle } = commonStyle;
        const {
            buttonPress,
            customButtonStyle,
            customTextStyle,
            dontAllowAnimation,
            allowSpinner,
            bottom
        } = this.props;

        const styles = {
            buttonContainerWholeViewStyle: {
                backgroundColor: colors.yellowColor,
                height: 40.6,
                borderRadius: 7,
                marginHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: (this.props.dontAllowMarginBottom)? 0: (bottom)? moderateScale(bottom):  moderateScale(30)        
            },          

            buttonTextStyle: {
                fontSize: 24,
                color: colors.black2,
            },
        }

        return (
                <TouchableView
                    activeOpacity={0.7}
                    onPress={buttonPress}
                    onPressIn={this.onButtonPressAnimation.bind(this)}
                    dontAllowAnimation={dontAllowAnimation}
                >
                        <View
                            style={[styles.buttonContainerWholeViewStyle, customButtonStyle]}
                        >
                            {
                                (allowSpinner)?
                                <View>
                                    {this.props.children}
                                </View>:
                                <Text
                                    style={[styles.buttonTextStyle, customTextStyle, fontInRegularStyle]}
                                >
                                    {this.props.children}
                                </Text>
                            }
                        </View>
                </TouchableView>
        
        )
    }
}


export { Button };