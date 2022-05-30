import React, { Component } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import { Button } from './index';
import { AlertBoxBell } from './index';
import { colors } from '../../utilities/constants';

class Alert extends Component {

    constructor(props) {
        super(props);


        this.state = {
            AlertVisibility: this.props.alertVisible,
            moveFrom: this.props.moveFrom,
            moveTo: this.props.moveTo
        }
    }
    
        componentWillMount() {
           this.animatedValue = new Animated.Value(0);
         }

         componentDidMount() {
            Animated.spring(this.animatedValue, {
                toValue: 1,
                duration: 10
            }).start();
        }

        okButtonPress() {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 300
            }).start(() => {
                this.props.onCancelButtonPress();
            });
        }


        onSecondButtonPress() {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 400
            }).start(() => {
                this.props.onCustomSecondButtonPress();
            });

        }
    

    render() {
        
        const interpolateMotion = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 200]
        });

        const animatedStyle = {
            top: interpolateMotion
        };

        const {
            alertMessage,
            secondButton,
            secondButtonText,
            onLogOutPress,
            cancelButtonStyle,
            logoutButtonStyle,
            alertTypeText,
            loading
        } = this.props;

       

        return (
           
            <Animated.View style={[styles.mainContainer, animatedStyle]}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={styles.alertWholeViewStyle}>

                        <View
                            style={styles.alertInnerUpperViewStyle}
                        >
                            <AlertBoxBell
                                   
                            />
                            {/* {
                                ((alertTypeText === 'Log Out') || (alertTypeText === 'Delete') || (alertTypeText === 'Request') || (alertTypeText === 'Message') || (alertTypeText === 'Confirm') ) ?
                                   :
                                   <Image
                                    source={(alertTypeText === 'Success')?  require('../assets/gif/greenTickOneTime.gif'):  require('../assets/gif/wrong.gif') }
                                    style={(alertTypeText === 'Log Out')? { height: 30, width: 30, tintColor: RED_COLOR }:  { height: 30, width: 30 }}
                               />

                            } */}


                            <Text
                                style={{
                                    color: colors.black1,
                                    // fontFamily: 'Roboto-Medium',
                                    fontSize: 20,
                                    marginBottom: 5,
                                    marginTop: 5,
                                    fontWeight: '600'
                                }}
                            >
                            
                                {alertTypeText}
                            </Text>
                        </View>

                        <View
                            style={styles.alertInnerLowerViewStyle}
                        >

                            <Text
                                style={{
                                    alignSelf: 'center',
                                    color: colors.black1,
                                    textAlign: 'center',
                                    marginBottom: 6,
                                    marginTop: 13,
                                    marginHorizontal: 10
                                }}
                           
                                
                            >
                            {alertMessage}
                            </Text>

                            <View
                                style={styles.buttonWholeViewStyle}
                            >
                             
                                {
                                    (secondButton) ?
                                    <View
                                        style={{ flex: 1 }}
                                    >
                                <Button
                                    customButtonStyle={[styles.defaultButtonStyle, cancelButtonStyle]}
                                    buttonPress={this.okButtonPress.bind(this)}
                                    customTextStyle={{ color: colors.themeBackgroundColor, fontSize: 18 }}
                                >
                                    {this.props.firstButtonText}
                
                               </Button> 
                               </View>
                               :

                               <View
                                    style={{
                                        flex: 1
                                    }}
                               >

                                <Button
                                    customButtonStyle={styles.defaultButtonStyle}
                                    buttonPress={this.okButtonPress.bind(this)}
                                    customTextStyle={{ color: colors.white1, fontSize: 14 }}
                                >
                                  Okay
                                </Button>
                            </View>

                                }

                               {
                                 (secondButton) ?
                               <View
                                style={{ flex: 1 }}
                               >
                                 <Button
                                     customButtonStyle={[styles.defaultButtonStyle]}
                                     buttonPress={this.onSecondButtonPress.bind(this)}
                                     dontAllowColorMixture
                                     customTextStyle={{ color: colors.themeBackgroundColor , fontSize: 18 }}
                                 >
                                      {secondButtonText}
                               </Button> 
                               </View>
                              
                               : <View />
 
                              }
                            </View>

                        </View>


                    </View>
                </View>
    
            </Animated.View>
        )
    }
}


const styles = {


    mainContainer: {

        flex: 1,
        position: 'absolute',
        width: 350,
        alignSelf: 'center',
        zIndex: 2
        // justifyContent: 'center',
        // alignItems: 'center'

    },

    alertWholeViewStyle: {
        // flex: 1,
        width: '80%',
        // borderRadius: 17,
        // borderWidth: 1,

        // borderColor: 'white',

        //   alignSelf: 'center'

    },

    alertInnerUpperViewStyle: {
        height: 84,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top: 2
        //   borderRadius: 17

    },

    alertInnerLowerViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.skyblueColor ,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,


        //   height: 44
    },

    buttonWholeViewStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    cancelButtonStyle: {
        backgroundColor: colors.green,
        height: 40,
        flex: 1,
      //  marginTop: 20,
        marginVertical: 10,
        borderRadius: 5,
        marginLeft: 0,
        marginRight: 10

    },

    defaultButtonStyle: {
        backgroundColor: colors.yellowColor ,
        borderRadius: 50,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        flex: 1,
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 10,

    }
};

export { Alert };
