import { Dimensions } from "react-native";

const appData = {
    screenWidth: Math.round(Dimensions.get('window').width),
    screenHeight: Math.round(Dimensions.get('window').height),
}

export { appData };