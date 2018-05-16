import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export class Flag extends React.Component {
  anim = new Animated.Value(0);

  componentDidMount() {
    /*     Animated.timing(this.anim, {
      easing: Easing.quad,
      toValue: 1,
      duration: 1200,
      useNativeDriver: true
    }).start();
 */

    Animated.spring(this.anim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  }

  render() {
    const scale = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const translateX = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-500, 0]
    });

    const translateY = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0]
    });

    const rotate = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ["90deg", "0deg"]
    });

    const transformStyle = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }]
    };

    return (
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={[transformStyle, styles.bar1]} />
        <Animated.View style={[transformStyle, styles.bar2]} />
        <Animated.View style={[transformStyle, styles.bar3]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center"
  },
  bar1: {
    width: 100,
    height: 200,
    backgroundColor: "blue"
  },
  bar2: {
    width: 100,
    height: 200,
    backgroundColor: "white"
  },
  bar3: {
    width: 100,
    height: 200,
    backgroundColor: "red"
  }
});
