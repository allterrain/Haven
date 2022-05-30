import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, Linking } from 'react-native';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent, Header } from '../../../components/common';
import { strings } from '../../../localization';
import { arrowIcon, homeIcon } from '../../../utilities/assets';

class ColorVisualizerToolScreen extends Component {
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
    }

    onLinkPress() {
        Linking.openURL('https://havenunderdeck.com/color-visualizer/');
    }

    render() {
        return (
            <View style={styles.wholeViewStyle}>
                <ScrollView
                    bounces={false}
                >
                    <Header  navigating={this.props.navigation}/>
                    <ScreenNameComponent title={'COLOR VISUALIZER TOOL'} />
                    <View>
                        <Text style={[styles.normalTextStyle, styles.coloredTextStyle]}>DOES NOT LOAD THIS SCREEN</Text>
                        <Text style={[styles.normalTextStyle, styles.coloredTextStyle]}>Loads user's default browser with:</Text>
                        <Text 
                            style={[styles.normalTextStyle, styles.coloredTextStyle, styles.linkTextStyle]}
                            onPress={this.onLinkPress.bind(this)} 
                        >https://havenunderdeck.com/color-visualizer/</Text>
                    </View>                        
                    <BottomNavigationComponent 
                        firstIcon={arrowIcon}                                                                                                                                                                                                                                                                 
                        secondIcon={homeIcon}
                        onFirstIconPress={() => this.props.navigation.goBack()}
                        onSecondIconPress={() => this.props.navigation.popToTop()}                  
                    />
                </ScrollView>

            </View>
        )
    }
} 

export default ColorVisualizerToolScreen;