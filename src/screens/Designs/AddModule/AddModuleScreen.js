import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent } from '../../../components/common';
import { strings } from '../../../localization';
import { plusIcon, questionIcon, arrowIcon } from '../../../utilities/assets';

class AddModuleScreen extends Component {
    
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
    }
    
    render() {
        const { addModule } = strings;
        return (
            <View style={styles.wholeViewStyle}>
                <View style={styles.wholeViewStyle}>
                    <ScreenNameComponent title={addModule} />
                </View>
                <BottomNavigationComponent 
                    firstIcon={arrowIcon}
                    onFirstIconPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

export default AddModuleScreen;