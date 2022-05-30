import React, { Component } from 'react';
import { View, PermissionsAndroid, Platform, Dimensions,Text } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import wiringDiagFile from '../../..//utilities/pdf/haven_control_module_wiring_diagram.pdf';
import haven_inst_sheet from '../../../utilities/pdf/haven_inst_sheet.pdf';
import { appData, colors } from '../../../utilities/constants';
import styles from './Styles';
import { Header, BottomNavigationComponent, Alert } from '../../../components/common';
import { arrowIcon } from '../../../utilities/assets';

class ReadpdfFile  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

    componentDidMount() {
        setTimeout(() => {
            this.downloadFile();
        }, 200)
    }

    async downloadFile() {

        if(Platform.OS ==='android') {
         try {
             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               this.actualDownload();
             } else {
               alert('Permission Denied!', 'You need to give storage permission to download the file');
             }    
           } catch (err) {
             console.warn(err);
           }
        }
        else {
             this.actualDownload()
        }     
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
                          backgroundColor: colors.black1,
                          opacity: 0.4
                      }}
              />
      
              <Alert
                  alertMessage={message}
                  // firstButtonText={'Yes'}
                  onCancelButtonPress={() => {
                      this.setState({ message: '' })
                  }
                  }
                  alertTypeText={'Message'}
              />
               </View>
          );
      }
  }

    actualDownload() {
        const { fileType } = this.props.route.params;
        let url = '';
        let path = '';
        const { dirs } = RNFetchBlob.fs;
        //   RNFetchBlob.fs.mkdir(RNFetchBlob.fs.dirs.DocumentDir + '/' + 'Haven_files');
        //   const DirectoryPath= RNFetchBlob.ExternalStorageDirectoryPath +'/'+ 'Haven_files';
        //   RNFetchBlob.mkdir(DirectoryPath);
        //  RNFS.readDir(DirectoryPath).then((res) => 
        //     alert(res)
        //  ).catch((er) => 
        //  alert(er))   

        if(fileType === 'wiring') {
            // url = 'https://drive.google.com/uc?export=download&id=1V7dovl7T_2WS729udj5R_MVA9j_MHRfw';
            url = 'https://havenunderdeck.com/wp-content/uploads/2020/11/haven_control_module_wiring_diagram.pdf';
            path = `${(Platform.OS === 'android'? dirs.DownloadDir: dirs.DocumentDir )}/Haven UD/haven_control_module_wiring_diagram.pdf`;
          }
        else {
            url = 'https://havenunderdeck.com/wp-content/uploads/2020/11/haven_inst_sheet.pdf';
            path = `${(Platform.OS === 'android'? dirs.DownloadDir: dirs.DocumentDir)}/Haven UD/haven_inst_sheet.pdf`;
        }
        console.log('path=====', path)
        RNFetchBlob.config({
            fileCache: true,
            path: path,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mediaScannable: true,
              title: `havenUnderdeck_${fileType}.pdf`,
              path:  path,
            },
        }).fetch('GET',  url, {}).then((res) => {
              console.log('The PDF has be===', res);
              // RNFetchBlob.ios.openDocument(res.data);
              var destPath = RNFS.DocumentDirectoryPath + '/';
              this.setState({
                message: 'The PDF has been downloaded to your phone' 
                // message:  `The file is saved to ${res.path()}`
              });

              // if (RNFS.exists("sinan")){
              //   console.log("BLAH EXISTS");
              //   alert('existd s')
              // } else {
              //   alert('doesn exist')
              //   console.log("BLAH DOES NOT EXIST");
              //   const    AppFolder    =     'Egemen';
              //   const DirectoryPath= RNFS.DocumentDirectoryPath +'/'+ AppFolder;
              //   RNFS.mkdir(DirectoryPath);
              
              // }
             
                // RNFetchBlob.fs.writeFile(path, res.data, 'base64');
                // RNFetchBlob.ios.previewDocument(path);
              // let destinationPath = destPath + 'Egemen' + '/';
              // alert(destinationPath)
              // RNFS.moveFile(res.path(), destinationPath)
              // .then((success) => {
              //   alert('gppd')
              // console.log('file read!');
              // })
              // .catch((err) => {

              //   alert(err)
              // console.log("Error: " + err.message);
              // });
         })
         .catch((e) => {
           console.log(e)
         });
     }

    render() {
        const { fileType } = this.props.route.params;
        return (
            <View style={styles.wholeViewStyle}>
            <Header navigating={this.props.navigation} />
            <Pdf
                source={ {uri : (fileType === 'wiring')? 'https://havenunderdeck.com/wp-content/uploads/2020/11/haven_control_module_wiring_diagram.pdf': 'https://havenunderdeck.com/wp-content/uploads/2020/11/haven_inst_sheet.pdf', cache: true}}
                style={styles.wholeViewStyle}
                onLoadProgress={percent => {
                    console.log("percent", percent)
                  }}
                  activityIndicator={  <View style={{flex: 1, padding: 10, textAlign: 'center'}}>
                  <Text style={[styles.normalTextStyle, {textAlign: 'center'}]} >Please Wait while we are loading document</Text>
              </View>}
            />
                <BottomNavigationComponent
                    firstIcon={arrowIcon}
                    onFirstIconPress={() => this.props.navigation.goBack()}    
                />
            {this.renderAlertBox()}
            </View>
        )
    }
    
}




export default ReadpdfFile;

