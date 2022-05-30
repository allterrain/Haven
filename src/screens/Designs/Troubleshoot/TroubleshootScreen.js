import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, FlatList, Linking, Platform } from 'react-native';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent, Header, Alert } from '../../../components/common';
import { strings } from '../../../localization';
import { plusIcon, questionIcon, arrowIcon, homeIcon } from '../../../utilities/assets';
import { appData, colors } from '../../../utilities/constants';

const firstArray = [{ title: '#1: On your phone, go to Settings then Bluetooth then select Haven Control Module.' },
{ title: '#2: Do you have multiple Haven Control Modules? If yes, on your phone, go to Settings then Bluetooth then switch to the other Haven Control Module. Haven Control Module power light and Bluetooth light came on but app controls do not work.' }
];

const secondArray = [
    {
        title: '#1: You may be too far away from the Haven Control Module – move closer.'
    },
    {
        title: '#2: Do a hard restart on your phone. Haven UD app does not control accessories.'
    }
];

const thirdArrray = [
    {
        title: '#1: Check Haven Control Module switch and confirm the power light is on.'
    },
    {
        title: '#2: If Haven Control Module power light is not on, \n• Check GFIC and other breakers. \n• Ensure you have power to the Haven Control Module. '
    },

    {
        title: '#3: Check Haven Control Module and confirm the Bluetooth light is on. If the Bluetooth light is not on, go to your phone’s Settings then Bluetooth and select Haven Control Module. '
    },
    
    {
        title: '#4: You may be too far away from the Haven Control Module – move closer.'
    },

    {
        title: '#5: Do a hard restart on your phone.'
    }
]

const fourthArray = [
    {
        title1: 'Haven@HavenUnderdeck.com',
        title2: '1-855-238-5695'
    }
]



class TroubleshootScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
    }

    renderListData(item) {
        return (
            <Text style={styles.normalTextStyle}>
                {item.title}
            </Text>
        )
    }

    openEmailUrl() {
        this.setState({ message: 'We would like to open Gmail?' })
    }

    renderAlertBox() {
        const { message } = this.state;
        if(message) {
            return (
                <View style={{ height: appData.screenHeight, width: appData.screenWidth, position: 'absolute' }}>
                    <View
                        style={{
                            height: appData.screenHeight,
                            width: appData.screenWidth,
                            position: 'absolute',
                            backgroundColor: colors.black1 ,
                            opacity: 0.4
                        }}
                />
        
                <Alert
                    alertMessage={message}
                    secondButton
                    firstButtonText={'Yes'}
                    secondButtonText={'No'}
                    onCancelButtonPress={() => {
                        let email = fourthArray[0].title1;
                        Linking.openURL(`mailto:${email}`);
                        this.setState({ message: '' })
                    }
                    }
                    onCustomSecondButtonPress={() => {
                        this.setState({ message: '' })
                    }}
                    alertTypeText={'Message'}
                />
                 </View>
            );
        }
    }

    openCallDialer() {
        let phoneNumber = fourthArray[0].title2;
        if (Platform.OS === 'android') {
        phoneNumber =  `tel:${phoneNumber}`;
        }
        else {
        phoneNumber = `telprompt:${phoneNumber}`;
        }
    
        Linking.openURL(phoneNumber);
    }

    render() {
        return (
            <View style={styles.wholeViewStyle}>
                <View style={styles.wholeViewStyle}>
                    <Header navigating={this.props.navigation} />
                    <ScrollView bounces={false} >
                        <View style={styles.wholeViewStyle}>
                            <ScreenNameComponent title={'TROUBLESHOOT'} />
                            <View style={styles.listWholeViewStyle}>
                                <View style={styles.listHeadingValueViewStyle}>
                                    <Text style={styles.listViewHeadingTextStyle}>Haven Control Module is not connecting to Bluetooth.</Text>
                                    <FlatList
                                        data={firstArray}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            this.renderListData(item)
                                        }
                                    />
                                </View>
                                <View style={styles.listHeadingValueViewStyle}>
                                    <Text style={styles.listViewHeadingTextStyle}>Haven Control Module power light and Bluetooth light came on but app controls do not work</Text>
                                    <FlatList
                                        data={secondArray}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            this.renderListData(item)
                                        }
                                    />
                                </View>
                                <View style={styles.listHeadingValueViewStyle}>
                                    <Text style={styles.listViewHeadingTextStyle}>Haven UD app does not control accessories.</Text>
                                    <FlatList
                                        data={thirdArrray}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            this.renderListData(item)
                                        }
                                    />
                                </View>

                                <View style={[styles.listHeadingValueViewStyle, styles.lastDataViewStyle]}>
                                    <Text style={styles.listViewHeadingTextStyle}>Still experiencing issue?</Text>
                                    <Text style={styles.normalTextStyle}>
                                      Send an email to <Text onPress={this.openEmailUrl.bind(this)}>{fourthArray[0].title1}</Text> or call <Text onPress={this.openCallDialer.bind(this)}>{fourthArray[0].title2}</Text>    
                                    </Text>
                                </View>
                                                              
                            </View>

                        </View>
                        
                    </ScrollView>                    
                    <BottomNavigationComponent 
                            firstIcon={arrowIcon}
                            onFirstIconPress={() => this.props.navigation.goBack()}    
                    />
                </View>
                {this.renderAlertBox()}

            </View>
        )
    }
} 

export default TroubleshootScreen;