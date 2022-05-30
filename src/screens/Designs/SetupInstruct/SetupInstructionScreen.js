import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, FlatList } from 'react-native';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent, Header, Button } from '../../../components/common';
import { strings } from '../../../localization';
import { plusIcon, questionIcon, arrowIcon, homeIcon } from '../../../utilities/assets';

const firstArray = [
    {
        title: '#1: Push power button on Haven Control module. Red light should come on.',
    }, 
    {
        title: '#2: On your device, go to Settings then Bluetooth and turn on Bluetooth. Stay on this screen until you complete the steps to pair your accessory. ',
    },
    {
        title: '#3: Wait for it to appear as discoverable on your device. Select Haven Control Module. If you have multiple Haven Control Modules you will have to repeat process to select additional modules.'
    },
    {
        title: '#4: Look at Haven Control Module to see if Bluetooth light has come on.'
    },
    {
        title: '#5: Once the Bluetooth light has turned on launch the Haven UD App click on the Haven Control module button.'
    },
    {
        title: '#6: This will bring you to your accessories and be able to control them with the slide bars.'
    }
];


class SetupInstructionScreen extends Component {
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

    render() {
        return (
            <View style={styles.wholeViewStyle}>
                <View style={styles.wholeViewStyle}>
                    <Header navigating={this.props.navigation} />
                    <ScrollView bounces={false}>
                        <View style={styles.wholeViewStyle}>
                            <ScreenNameComponent title={'SETUP INSTRUCTIONS'} />
                            <View style={styles.listWholeViewStyle}>
                                <View >
                                    <Text style={styles.listViewHeadingTextStyle}>Pair your device with a Bluetooth accessory</Text>
                                    <FlatList
                                        data={firstArray}
                                        showsVerticalScrollIndicator={false}
                                        scrollEnabled={false}
                                        renderItem={({ item, index }) =>
                                            this.renderListData(item)
                                        }
                                    />
                                </View>                                
                            </View>
                            <Button
                                customButtonStyle={styles.troubleShootbuttonViewStyle}
                                buttonPress={() => this.props.navigation.navigate('TroubleshootScreen')}
                            >
                                Troubleshoot
                            </Button>
                            <Button
                                customButtonStyle={styles.pdfButtonViewStyle}
                                buttonPress={() => this.props.navigation.navigate('ReadPdfFile', { fileType: 'wiring' })}
                            >
                                Wiring Diagram (PDF)
                            </Button>
                            

                        </View> 
                    </ScrollView>                    
                    <BottomNavigationComponent 
                        firstIcon={arrowIcon}
                        onFirstIconPress={() => this.props.navigation.goBack()}    
                    />
                </View>
            </View>
        )
    }
} 

export default SetupInstructionScreen;