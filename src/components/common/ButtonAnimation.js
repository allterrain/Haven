import React, { Component } from 'react';
import { 
        View, 
        Animated, 
        ActivityIndicator, 
        Platform 
    } from 'react-native';
import { colors } from '../../utilities/constants';
class ButtonAnimation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            done: 0

        }
    }

        componentWillMount() {
            this.animatedValue = new Animated.Value(0);
        }

         componentDidMount() {
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 150
            }).start(() => {
                this.setState({
                    done: 1
                })
            });
        }

        
    render() {

        const {
            customButtonStyle,
            applyMultiColor
        } = this.props;

        const widthInterpolateMotion = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 32]
        });
        
        const heightInterpolateMotion = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [32, 32]
        });
     

        const animatedStyle = {
            width: widthInterpolateMotion,
            height: heightInterpolateMotion
        }

        return (

            <View
            style={{
                flex: 1,
            }}
            >
                <Animated.View 
                    style={(customButtonStyle)? [styles.buttonViewStyle, customButtonStyle, animatedStyle]:  [styles.buttonViewStyle, animatedStyle]}
                >

                            <View
                                style={ 
                                    [styles.buttonViewStyle]
                                }
                            >

                             <ActivityIndicator
                                color={colors.blue1}
                                size={'small'}
                             />
                            </View>
               
               

                </Animated.View>
                
            </View>
        
        )
    }
}

const styles = {
    buttonViewStyle: {
        height: 32,
        backgroundColor: colors.white1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        
    }
}

export { ButtonAnimation };

