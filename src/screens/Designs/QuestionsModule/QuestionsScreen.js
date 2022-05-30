import React, { Component } from 'react';
import { View, Linking, ScrollView, StatusBar } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import styles from './Styles';
import { ScreenNameComponent, Button, BottomNavigationComponent, Header } from '../../../components/common';
import { strings } from '../../../localization';

class QuestionsScreen extends Component {
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
      }

    onButtonPress(data) {
        const { 
            setupInstruct,
            troubleShoot,
            underdeckInstallTut,
            SpeakerInstallInst,
            ColorVisualTool,
            havenCntrlModule 
        } = strings;
        let { title } = data;
        let descp1 = '';
        let descp2 = '';

        if(title === havenCntrlModule) {
            this.props.navigation.navigate('ModuleSpecificationScreen')
        }
        else if(title === setupInstruct) {
            this.props.navigation.navigate('SetupInstructionScreen')
        }
        else if(title === troubleShoot) {
            this.props.navigation.navigate('TroubleshootScreen');
        }
        else if(title === underdeckInstallTut) {
            this.props.navigation.navigate('UDInstallTutorialsScreen');
        }
        else if(title === ColorVisualTool) {
            Linking.openURL('https://havenunderdeck.com/color-visualizer/');
        }
        
    }

    render() {
        const { 
                setupInstruct,
                troubleShoot,
                underdeckInstallTut,
                SpeakerInstallInst,
                ColorVisualTool,
                havenCntrlModule 
            } = strings;
        return (
            <View style={styles.wholeViewStyle}>
                    <Header />
                    <ScrollView
                       contentContainerStyle={styles.scrollViewStyle}
                        bounces={false}
                    >
                        <View style={styles.allButtonssTopViewStyle}>
                            <Button customButtonStyle={styles.buttonViewStyle}  buttonPress={this.onButtonPress.bind(this, {title: havenCntrlModule})} dontAllowMarginBottom >{havenCntrlModule}</Button>
                            <Button customButtonStyle={styles.buttonViewStyle}  buttonPress={this.onButtonPress.bind(this, {title: setupInstruct})} dontAllowMarginBottom>{setupInstruct}</Button>
                            <Button customButtonStyle={styles.buttonViewStyle} buttonPress={this.onButtonPress.bind(this, {title: troubleShoot})} dontAllowMarginBottom>{troubleShoot}</Button>
                            <Button customButtonStyle={styles.buttonViewStyle} buttonPress={this.onButtonPress.bind(this, {title: underdeckInstallTut})} dontAllowMarginBottom >{underdeckInstallTut}</Button>
                            <Button  buttonPress={this.onButtonPress.bind(this, {title: ColorVisualTool})}  dontAllowMarginBottom>{ColorVisualTool}</Button>
                        </View>
                    </ScrollView>
                    <BottomNavigationComponent />
                   
            </View>
        )
    }
}

export default QuestionsScreen;