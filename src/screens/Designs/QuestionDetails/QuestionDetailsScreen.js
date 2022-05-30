import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent } from '../../../components/common';
import { strings } from '../../../localization';
import { plusIcon, questionIcon, arrowIcon, homeIcon } from '../../../utilities/assets';

class QuestionDetailsScreen extends Component {
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
    }
    render() {
        const { title, descp1, descp2 } = this.props.route.params;
        const { ColorVisualTool } = strings;
        return (
            <View style={styles.wholeViewStyle}>
                <View style={styles.wholeViewStyle}>
                    <ScreenNameComponent title={title} />
                    <View style={styles.innerViewStyle}>
                        {
                            (title != ColorVisualTool)&&
                            <Text lineHeight={ 30} style={styles.normalTextStyle}>Copy and photos only.</Text>
                        }
                        {
                            (title === ColorVisualTool)?
                            <View>
                                <Text style={[styles.normalTextStyle, styles.coloredTextStyle]}>{descp1}</Text>
                                <Text style={[styles.normalTextStyle, styles.coloredTextStyle]}>{descp2}</Text>
                                
                            </View>
                            :
                            <Text style={styles.normalTextStyle}>{descp1}</Text>
                        }
                    </View>
                   
                </View>
                <BottomNavigationComponent 
                    firstIcon={arrowIcon}
                    onFirstIconPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
} 

export default QuestionDetailsScreen;