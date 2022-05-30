import React, { Component } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import Ripple from 'react-native-material-ripple';

class TouchableView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false
        },
        this.animatedValue = new Animated.Value(0);

    }

    onButtonPress() {
        // const { buttonPressed } = this.state;
        // if (buttonPressed === false) {
        //     this.setState({ buttonPressed: true })
        //     if(this.props.onPress) {
                this.props.onPress(); 
        //     }
            
        //     setTimeout(() => {
        //         this.setState({
        //             buttonPressed: false,
        //         });
        //     }, 3000) 
        // }


    }

    onPressInAnimation() {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 400
        }).start();
    }

    onPressOutAnimation() {
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 400
        }).start();
    }

    render() {

        const interpolateScale = this.animatedValue.interpolate({
            inputRange: [0, 1,],
            outputRange: [1, 0.95]
        });
        const animatedStyle = {
            transform: [
                { scale: interpolateScale }
            ]
        };
        const {
            allowWholeViewStyle,
            style,
            onPress,
            dontAllowAnimation
        } = this.props;

        return (
            <Animated.View
                style={[(allowWholeViewStyle) ? styles.wholeViewStyle : null, (dontAllowAnimation) ? null : animatedStyle]}
            >
                
                <Ripple
                    onPress={this.onButtonPress.bind(this)}
                    onPressIn={this.onPressInAnimation.bind(this)}
                    onPressOut={this.onPressOutAnimation.bind(this)}
                    style={style}
                    activeOpacity={0.99}
                    rippleSize={100}
                >
                        {this.props.children}
                </Ripple>

            </Animated.View>
        )
    }
}

const styles = {
    wholeViewStyle: {
        flex: 1
    },




}

export { TouchableView };