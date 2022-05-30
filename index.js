/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);



// // in your index.ios.js or index.android.js
// import React, { Component } from "react";
// import { AppRegistry } from "react-native";
// import App from "react-native-ble-manager/example/App"; //<-- simply point to the example js!
//  import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);