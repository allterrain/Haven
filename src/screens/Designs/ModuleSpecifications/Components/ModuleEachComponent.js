import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Vibration, Platform, NativeModules, NativeEventEmitter } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import Sound from 'react-native-sound';
import Slider from "react-native-slider";
import { Switch } from 'react-native-switch';
import { colors } from '../../../../utilities/constants';
import { stringToBytes } from "convert-string";

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


// import BluetoothSerial from 'react-native-bluetooth-serial'
// import { Buffer } from 'buffer'


// global.Buffer = Buffer

const playSoundAndVibration = () => {
    var whoosh = new Sound((Platform.OS === 'android')? 'alert_sound.mp3': 'alertSound.mp3', Sound.MAIN_BUNDLE, (error) => {
        Vibration.vibrate()
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      
        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });
}

 
const ModuleEachComponent = (props) => {

    
    const { item } = props;
    const [specValue, updateValue] = useState(0);
    const [isStarted, updateWhenMoveProgress] = useState(false);
    const service = 'edf61fff-ad18-4859-aede-f3b7a23b6bdc';
    const characteristic = '060f1af6-d7f8-4e39-ba2b-e2ee3c420f9d';

    return (
        <View style={styles.wholeViewStyle}>
            <Image
                source={item.icon}
                style={styles.iconStyle}
            />
            {   
              
                (item.title === 'fl') ?
                    <Switch 
                    barHeight={31}    
                    circleSize={31}
                    value={(specValue === 0)? false: true}
                        onValueChange={(val) =>{ 
                            updateValue((val === false)? 0:100)
                            if (!isStarted) {
                                updateWhenMoveProgress(true)
                            }
                           
                            var messageToWrite = `fl_${val === false? "0" : "1"}`

                            const byteArray = stringToBytes(messageToWrite);

                            BleManager.write(
                                props.device.id,
                                service,
                                characteristic,
                                byteArray
                              )
                                .then(() => {
                                
                                })
                                .catch((error) => {
                                 
                                });

                            // BluetoothSerial.write(messageToWrite)
                            // .then((res) => {
                               
                            // })
                            // .catch((err) => alert(err.message))
                        } 
                         
                        }
                        circleActiveColor={colors.yellowColor}
                        circleInActiveColor={colors.yellowColor}
                        backgroundActive={colors.skyblueColor}
                        backgroundInactive={colors.skyblueColor}
                        circleBorderWidth={0}
                    />:
                    (
                        (item.title === 'led')?
                            <TouchableOpacity 
                        style={styles.slider}
                        activeOpacity={0.99}
                        onPress={() => {
                            if(item.title === 'fl') {
                                if(specValue === 0) {
                                    updateValue(100)
                                }   
                                else {
                                    updateValue(0)
                                }
                            } 
                        }}
                    >
                        <Slider
                            style={styles.slider}
                            trackStyle={styles.trackStyle}
                            thumbStyle={(specValue < 2)? [styles.thumbStyle, styles.thumbStyleValueLessthanTwo]: styles.thumbStyle}
                            onSlidingComplete={(data) => {

                                var messageToWrite = `led_${255-parseInt(data)}`
                             
                                const byteArray = stringToBytes(messageToWrite);
                                console.log('props.device.id', props.device.id)
                                console.log('props.device.service', props.device.service)
                                console.log('props.device.characteristic', props.device.characteristic)
                                BleManager.write(
                                    props.device.id,
                                    service,
                                    characteristic,
                                    byteArray
                                  )
                                    .then((result) => {
                                        console.log('command result', result)
                                    })
                                    .catch((error) => {
                                        console.log('command error', error)
                                    });

                                // BluetoothSerial.write(messageToWrite)
                                // .then((res) => {
                                    
                                // })
                                // .catch((err) => alert(err.message))
                            }}
                            onValueChange={(data) => {
                                updateValue(data)
                                if (!isStarted) {
                                    updateWhenMoveProgress(true)

                                   
                                }

                              
                                
                               
                            }}
                            value={specValue}
                            maximumValue={255}
                            minimumValue={0}
                            disabled={(item.title === 'fl')? true: false}	                       
                            minimumTrackTintColor={specValue === 0? 'transparent': colors.yellowColor }
                        />
                    </TouchableOpacity>
                        :
                        <TouchableOpacity 
                        style={styles.slider}
                        activeOpacity={0.99}
                        onPress={() => {
                            if(item.title === 'fl') {
                                if(specValue === 0) {
                                    updateValue(100)
                                }   
                                else {
                                    updateValue(0)
                                }
                            } 
                        }}
                    >
                        <Slider
                            style={styles.slider}
                            trackStyle={styles.trackStyle}
                            thumbStyle={(specValue < 2)? [styles.thumbStyle, styles.thumbStyleValueLessthanTwo]: styles.thumbStyle}
                            onSlidingComplete={(data) => {

                                if(item.title == 'light'){
                                    var messageToWrite = `light_${parseInt(data)}`

                                }else{
                                    var messageToWrite = `fan_${parseInt(data)}`
                                }
                              
                                const byteArray = stringToBytes(messageToWrite);

                                BleManager.write(
                                    props.device.id,
                                service,
                                characteristic,
                                byteArray
                                  )
                                    .then(() => {
                                    
                                    })
                                    .catch((error) => {
                                     
                                    });

                                // BluetoothSerial.write(messageToWrite)
                                // .then((res) => {
                                    
                                // })
                                // .catch((err) => alert(err.message))
                            }}
                            onValueChange={(data) => {
                                updateValue(data)
                                if (!isStarted) {
                                    updateWhenMoveProgress(true)
                                }
                            }}
                            value={specValue}
                            maximumValue={100}
                            minimumValue={0}
                            disabled={(item.title === 'fl')? true: false}	                       
                            minimumTrackTintColor={specValue === 0? 'transparent': colors.yellowColor }
                        />
                    </TouchableOpacity>
                    )
                    
            }   

            {
                (((specValue === 100) || (specValue === 0) ) && (isStarted))?
                playSoundAndVibration(): null
                
            }
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    
    wholeViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 51,
        
    },

    iconStyle: {
        marginRight: 12
    },

    slider: {
        flex: 1
    },
    
    trackStyle: {
        height: 31,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: colors.skyblueColor
    },
    
    thumbStyle: {
        height: 31,
        width: 31,
        backgroundColor: colors.yellowColor,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20
    },

    thumbStyleValueLessthanTwo: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: colors.yellowColor
    }


})

export { ModuleEachComponent };