import React, { Component } from 'react';
import { verticalScale } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob'
import { View, Text, StatusBar, ScrollView, FlatList, Platform, Dimensions, Linking, PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './Styles';
import { ScreenNameComponent, BottomNavigationComponent, Header, Button } from '../../../components/common';
import { strings } from '../../../localization';
import { plusIcon, questionIcon, arrowIcon, homeIcon } from '../../../utilities/assets';
import { colors, appData } from '../../../utilities/constants';

const firstArray = [
    {
        title: '#1: Determine Wall Channel and Gutter Pitch',
        urlId: '7skriEXVA7c',
    }, 
    {
        title: '#2: Installing Wall Channels and Gutters',
        urlId: 'qABlV8b0IIw',
    },
    {
        title: '#3: Installing Ceiling Panels',
        urlId: 'B9hGysXdHjw',
    },
    {
        title: '#4: 0Installing Lights and Fans',
        urlId: 'PXm9H6QpWus',
    },
    {
        title: '#5: Removing and Replacing Panels',
        urlId: 'JBB-IXbAUgE',
    },
];


class UDInstallTutorialsScreen extends Component {
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBar.setBackgroundColor('transparent')
            StatusBar.setBarStyle('light-content')
            StatusBar.setTranslucent(true)    
        });
    }

    renderListData(item) {
        const userAgent = this.getUserAgentForIpad();
        const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.7, maximum-scale=0.7, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`

        return (
            <ScrollView 
                contentContainerStyle={{ height: 250, backgroundColor: 'transparent', overflow: 'hidden' }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.listViewHeadingTextStyle}>{item.title}</Text>
                <WebView
                    userAgent={userAgent}
                    useWebKit={true}
                    allowsFullscreenVideo={true}
                    allowsBackForwardNavigationGestures={true}
                    allowsInlineMediaPlayback={true}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={Platform.OS == "android" ? INJECTEDJAVASCRIPT : null}
                    ref={(ref) => this.myWebView = ref}
                    source={{ uri: `https://www.youtube.com/embed/${item.urlId}?rel=0&autoplay=0&showinfo=1&fs=1&modestbranding=1&iv_load_policy=0&end` }}
                    style={{ justifyContent: 'center', backgroundColor: colors.lightGreenColor, alignItems: 'center', padding: 0, flex: Platform.OS == "android" ? 0.9 : 1,  }}
                />
            </ScrollView>
        )
    }

    getUserAgentForIpad() {
        const isPad = Platform.OS == "ios" && Platform.isPad;
        const majorOsVersion = parseInt(Platform.Version.toString(), 10);

        if (isPad) {
            switch (majorOsVersion) {
                case 9:
                    return "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1";
                case 10:
                    return "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1";
                case 11:
                    return "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1";
                default:
                    return "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/ 604.1.21 (KHTML, like Gecko) Version/ 12.0 Mobile/17A6278a Safari/602.1.26";
            }
        } else {
            return undefined;
        }
    }

    pdfButtonPress() {
        let options = {
            fileCache: true,
            addAndroidDownloads : {
              useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
              notification : true,
            //   path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
              description : 'Downloading image.'
            }
          }
        // Linking.openURL('http://samples.leanpub.com/thereactnativebook-sample.pdf')
        RNFetchBlob
  .config(options)
  .fetch('GET', 'http://www.example.com/file/example.zip', {
    //some headers ..
  })
  .then((res) => {
      alert(res.path())
    // the temp file path
    console.log('The file saved to ', res.path())
  })
    }

    actualDownload = () => {
        const { dirs } = RNFetchBlob.fs;
        const source = {uri:'bundle-assets://haven_control_module_wiring_diagram.pdf'}
        
       alert('dsf')
        RNFetchBlob.config({
         fileCache: true,
         addAndroidDownloads: {
         useDownloadManager: true,
         notification: true,
         mediaScannable: true,
         title: `haven_underdeck.pdf`,
         path: `${dirs.DownloadDir}/test.pdf`,
         },
       })
         .RNFetchBlob.wrap('../../../utilities/pdf/haven_inst_sheet.pdf')
         .then((res) => {
             alert(res.path())
           console.log('The file saved to ', res.path());
         })
         .catch((e) => {
             alert(e)
           console.log(e)
         });
     }
     
   async downloadFile() {
       if(Platform.OS ==='android') {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              this.actualDownload();
            } else {
              Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
          } catch (err) {
            console.warn(err);
          }
       }
       else {
            this.actualDownload()
       }
         
     }

    render() {
        // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        // const source = {uri:'bundle-assets://haven_control_module_wiring_diagram.pdf'}
        // const source = { uri:  }
        return (
            <View style={styles.wholeViewStyle}>
                <View style={styles.wholeViewStyle}>
                    <Header navigating={this.props.navigation} />
                 <ScrollView bounces={false}>
                        <View style={styles.wholeViewStyle}>
                            <ScreenNameComponent title={'UNDERDECK INSTALLATION TUTORIAL'} />
                            <View style={styles.listWholeViewStyle}>
                                <Button
                                    buttonPress={() => this.props.navigation.navigate('ReadPdfFile', { fileType: 'instructions' })}
                                    customButtonStyle={styles.buttonViewStyle}
                                    // buttonPress={this.downloadFile.bind(this)}
                                >
                                    Download Instructions (PDF)
                                </Button>
                                <View style={{ overflow: 'hidden' }}>
                                <FlatList
                                        data={firstArray}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) =>
                                            this.renderListData(item)
                                        }
                                />   
                                </View> 
                                    
                            </View>
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

export default UDInstallTutorialsScreen;