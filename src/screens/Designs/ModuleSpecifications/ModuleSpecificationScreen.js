import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Text, NativeEventEmitter,PermissionsAndroid,
    NativeModules, AppState, Platform} from 'react-native';
import Slider from "react-native-slider";
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent, Header, Button } from '../../../components/common';
import { strings } from '../../../localization';
import {  arrowIcon } from '../../../utilities/assets';
import { ModuleSpecificationComponent } from './Components';
import { colors } from '../../../utilities/constants';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);


// import BluetoothSerial from 'react-native-bluetooth-serial'
// import { Buffer } from 'buffer'


// global.Buffer = Buffer

class ModuleSpecificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            errorMessage : '',
            isLoading: true,

            scanning:false,
            appState: ''
        }

        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        

    }

    checkPermissions(){

        if (Platform.OS === 'android' && Platform.Version >= 23) {

            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("Permission is OK");
                  this.findBleDevice();
                } else {
                  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                    if (result) {
                        this.findBleDevice();
                    } else {
                        this.setState({isLoading: false, errorMessage:"Please allow location permission", device: null});
                    }
                  });
                }
          });
        }
        else{
           this.findBleDevice();
        }
    }

    findBleDevice(){

        BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {

          
            let device = null;
            
            if(peripheralsArray.length){

                device =  peripheralsArray.filter((item) => item.name == "Haven Control Module");
                if(device && device.length){
                    device = device[0];
                }
            }

            if(device){

                BleManager.retrieveServices(device.id).then((peripheralData) => {
               
                    console.log('peripheralData', peripheralData);
                    device.characteristic = peripheralData.characteristics[0].characteristic,
                    device.service = peripheralData.characteristics[0].service
    
                    this.setState({isLoading: false, errorMessage: null, device: device});
    
                });

            }else{

                BleManager.scan([], 3, true).then((results) => {
                    console.log('scan comp')
                }).catch((error) => console.log('error', error));
            }
            
          });

       

    }


  handleDiscoverPeripheral(peripheral){

    console.log('Got ble peripheral', peripheral);
    if (peripheral.name == "Haven Control Module") {
      
        this.setState({isLoading: true, errorMessage:null, device: peripheral});
    }
  }

  handleAppStateChange(nextAppState) {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');

      this.checkPermissions();

    //   BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {

    //     console.log('peripheralsArray', peripheralsArray)
    //     if(!peripheralsArray.length){
    //         this.checkPermissions();
    //     }
        
    //   });
    }
    this.setState({appState: nextAppState});
  }

  handleDisconnectedPeripheral(data) {

    console.log('handleDisconnectedPeripheral', data);

    if(data && data.peripheral == this.state.device.id){

        this.setState({errorMessage: this.state.device.name + ' got disconnected', device: null})
    }

    // let peripherals = this.state.peripherals;
    // let peripheral = peripherals.get(data.peripheral);
    // if (peripheral) {
    //   peripheral.connected = false;
    //   peripherals.set(peripheral.id, peripheral);
    //   this.setState({peripherals});
    // }
    // console.log('Disconnected from ' + data.peripheral);
  }

  handleStopScan() {
    

    console.log('Stopped scan', this.state.device)
    //device was found. try to connect it
    if(this.state.device){
      
        this.setState({errorMessage: "Haven Control Module found. Connecting it.Please wait..."});

        BleManager.connect(this.state.device.id).then(() => {
            
            BleManager.retrieveServices(this.state.device.id).then((peripheralData) => {
               
                console.log('peripheralData', peripheralData);

                let device = this.state.device;
                device.characteristic = peripheralData.characteristics[0].characteristic,
                device.service = peripheralData.characteristics[0].service

                this.setState({isLoading: false, errorMessage: null, device: device});

            });

        }).catch((error) => {
            this.setState({isLoading: false, errorMessage: "Unable to connect to Haven Control Module. Please make sure device is turned on.", device: null});
        });
    }
    else{
        this.setState({isLoading: false, errorMessage: "Haven Control Module wasn't found. Please make sure device is on and you have bluetooth turned on on your phone.", device: null});
    }
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    //this.handlerUpdate.remove();
  }

    componentDidMount() {

        
        AppState.addEventListener('change', this.handleAppStateChange);
       


        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
        this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    //this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );


        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });

        BleManager.start({showAlert: false, forceLegacy: true}).then(() => {

            setTimeout(() => {

                this.checkPermissions();
            }, 2000) 
        });
       

       // this.findDevice();
      

        // BluetoothSerial.on('bluetoothEnabled', () => this.findDevice())
        // BluetoothSerial.on('bluetoothDisabled', () => this.findDevice())
        // BluetoothSerial.on('error', (err) => {

          
        //  //   this.setState({errorMessage: err.message, device: null})

        // });

        // BluetoothSerial.on('connectionLost', (err) => {

        //     if (this.state.device) {

        //         this.setState({errorMessage: err.message, device: null})
        //     }
        // })

    }

    findDevice(){

        this.setState({errorMessage: null, device: null, isLoading: true})

        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ])
        .then((values) => {

            
            const [ isEnabled, devices ] = values

            if(isEnabled == false){
                this.setState({isLoading: false, errorMessage: "Your phone's Bluetooth is turned off. Please turn it on and make sure you have Haven Control Module device paried with your phone", device: null})

            }else{

                if(devices && devices.length){

                    console.log('devices', devices);

                    const device = devices.filter((item, index) => item.name == 'Haven Control Module');
                    if(device && device.length){

                        BluetoothSerial.isConnected().then((isConnected) => {

                            if(isConnected){
                             
                                this.setState({isLoading: false, errorMessage:'', device: device[0]});

                                //  BluetoothSerial.write('led_255')
                                //         .then((res) => {
                                //             alert('Successfuly wrote to device')
                                        
                                //         })
                                //         .catch((err) => alert(err.message))
                            }
                            else{
                                BluetoothSerial.connect(device[0].id).then((response) => {

                                    this.setState({isLoading: false, errorMessage:'', device: device[0]});
        
                                       
        
                                }).catch((err) =>  this.setState({isLoading: false, errorMessage: "Unable to connect to Haven Control Module. Please make sure device is turned on.", device: null}))
        
                            }
                        })

                        
                      
                    }else{
                        this.setState({isLoading: false, errorMessage: "Haven Control Module device is not paried with your phone's bluetooth.", device: null});
                    }
                }
                else{
                    this.setState({isLoading: false,errorMessage: "Haven Control Module device is not paried with your phone's bluetooth.", device: null});
                }
            }
        }).catch(error => {
            this.setState({isLoading:false, errorMessage: "Something went wrong. Please try again later", device: null});
        })

    }
    render() {
        return (
            <View style={styles.wholeViewStyle}>
                <Header navigating={this.props.navigation}/>
                <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.wholeViewStyle}> 
                            <ScreenNameComponent title={'HAVEN CONTROL MODULE'} />

                            {this.state.isLoading ? 
                                <View style={{flex: 1, padding: 10, textAlign: 'center'}}>
                                     <Text style={[styles.normalTextStyle, {textAlign: 'center'}]} >Please wait while we are connecting to Haven Control Module...</Text>
                                </View> : 

                            this.state.device ? <ModuleSpecificationComponent device={this.state.device}  />: 
                                <View style={{flex: 1, padding: 10, textAlign: 'center'}}>
                                    <Text style={[styles.normalTextStyle, {textAlign: 'center'}]} >{this.state.errorMessage}</Text>
    
                                       <Button
                                   
                                    buttonPress={() => this.checkPermissions()}
                                >
                                    Try Again
                                </Button>
                                <Button
                                   
                                    buttonPress={() => this.props.navigation.navigate('SetupInstructionScreen', { fileType: 'wiring' })}
                                >
                                    Setup Instructions
                                </Button>
                                </View>
                            }
                            
                            
                    </View>
                    
                </ScrollView>
                <BottomNavigationComponent 
                            firstIcon={arrowIcon}
                            onFirstIconPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

export default  ModuleSpecificationScreen;