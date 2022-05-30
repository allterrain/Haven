import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { colors } from '../../utilities/constants';

class SnackBar extends Component
{
   constructor() {
   super();

   this.animatedValue = new Animated.Value(50);
   this.ShowSnackBar = false;
   this.HideSnackBar = true;
   this.state = {
     SnackBarInsideMsgHolder: ''
   };
 }

  ShowSnackBarFunction(SnackBarInsideMsgHolder="Default SnackBar Message...", duration=3000)
  {
    if(this.ShowSnackBar === false)
    {
      this.setState({ SnackBarInsideMsgHolder: SnackBarInsideMsgHolder });

      this.ShowSnackBar = true;

      Animated.timing
      (
          this.animatedValue,
          {
              toValue: 0,
              duration: 400
          }
      ).start(this.makeSnackBarStill);
    }
  }

  makeSnackBarStill = () => {

          Animated.timing
          (
            this.animatedValue,
            {
              toValue: 0,
              duration: 1000
            }
          ).start(this.SnackBarCloseFunction)


  }




    hide = (duration) =>
    {
      this.timerID = setTimeout(() =>
      {
        if(this.HideSnackBar === true)
        {
            this.HideSnackBar = false;

            Animated.timing
            (
              this.animatedValue,
              {
                toValue: 50,
                duration: 1000
              }
            ).start(() =>
            {
              this.HideSnackBar = true;
              this.ShowSnackBar = false;
              clearTimeout(this.timerID);
            })
        }
      }, 10000);
    }

    SnackBarCloseFunction = () =>
    {
      if(this.HideSnackBar === true)
      {
          this.HideSnackBar = false;
          clearTimeout(this.timerID);

          Animated.timing
          (
              this.animatedValue,
              {
                toValue: 50,
                duration: 1000
              }
          ).start(() =>
          {
              this.ShowSnackBar = false;
              this.HideSnackBar = true;
          });
      }
    }

    render()
    {
      return(

         <Animated.View style = {[{ transform: [{ translateY: this.animatedValue }]}, styles.SnackBarContainter ]}>

            <Text numberOfLines = { 2 } style = { styles.SnackBarMessage }>{ this.state.SnackBarInsideMsgHolder }</Text>

         </Animated.View>

      );
    }
}

export { SnackBar};


const styles = StyleSheet.create({

  SnackBarContainter:
  {
    position: 'absolute',
    backgroundColor: colors.black1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 5,
    height: 50,
    // paddingLeft: 10,
    // paddingRight: 55,

  },

  SnackBarMessage:
  {
    color: colors.white1,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center'
  },

  SnackBarUndoText:{
    color: '#FFEB3B',
    fontSize: 18,
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    padding: 5

  }
});
