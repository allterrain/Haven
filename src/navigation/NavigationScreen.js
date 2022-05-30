import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothDeviceListScreen from  '../screens/Designs/BluetoothDeviceList/BluetoothDeviceListScreen';
import AddModuleScreen from  '../screens/Designs/AddModule/AddModuleScreen';
import ModuleSpecificationScreen from '../screens/Designs/ModuleSpecifications/ModuleSpecificationScreen';
import QuestionsScreen from '../screens/Designs/QuestionsModule/QuestionsScreen';
import QuestionDetailsScreen from '../screens/Designs/QuestionDetails/QuestionDetailsScreen';
import TroubleshootScreen from '../screens/Designs/Troubleshoot/TroubleshootScreen';
import SetupInstructionScreen from '../screens/Designs/SetupInstruct/SetupInstructionScreen';
import UDInstallTutorialsScreen from '../screens/Designs/UDInstallTutorials/UDInstallTutorialsScreen';
import ColorVisualizerToolScreen from '../screens/Designs/ColorVisualizer/ColorVisualizerToolScreen';
import ReadPdfFile from '../screens/Designs/ReadPdfFile/ReadpdfFile.js';

const Stack = createStackNavigator();

const transitionAnim = ({ current, next, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.9],
              })
            : 1,
        },
      ],
    }
  }
}

const App = () => {
  return (
    <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  gestureEnabled: false,
                  headerShown: false
                }}
            >
             
                <Stack.Screen 
                    name="QuestionsScreen" 
                    component={QuestionsScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />
                  <Stack.Screen 
                    name="BluetoothDeviceListScreen" 
                    component={BluetoothDeviceListScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
               
               />
               
                <Stack.Screen 
                    name="TroubleshootScreen" 
                    component={TroubleshootScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
               
               />
                <Stack.Screen 
                    name="AddModuleScreen" 
                    component={AddModuleScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
               />
                <Stack.Screen 
                    name="ModuleSpecificationScreen" 
                    component={ModuleSpecificationScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />
                <Stack.Screen 
                    name="QuestionDetailsScreen" 
                    component={QuestionDetailsScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />

                <Stack.Screen 
                    name="SetupInstructionScreen" 
                    component={SetupInstructionScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />

                <Stack.Screen 
                    name="UDInstallTutorialsScreen" 
                    component={UDInstallTutorialsScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />

                <Stack.Screen 
                    name="ColorVisualizerToolScreen" 
                    component={ColorVisualizerToolScreen} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />

                <Stack.Screen 
                    name="ReadPdfFile" 
                    component={ReadPdfFile} 
                    options={{ cardStyleInterpolator: transitionAnim }}
                />
                
                
            </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;   