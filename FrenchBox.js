import React from "react";
import { Animated, StyleSheet, Easing } from "react-native";

export class FrenchBox extends React.Component {
  anim = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.anim, {
      toValue: 2
    }).start(({ finished }) => {
      Animated.timing(this.anim, {
        toValue: 0
      }).start();
    });
  }

  render() {
    const transformStyle = {
      height: 200,
      width: 200,
      backgroundColor: this.anim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ["blue", "white", "red"]
      })
    };
    return <Animated.View style={[transformStyle]} />;
  }
}
