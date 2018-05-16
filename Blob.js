import React from "react";
import PropTypes from "prop-types";
import {
  Animated,
  StyleSheet,
  Easing,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const { width, height } = Dimensions.get("window");

export class Blob extends React.Component {
  static propTypes = {
    onDead: PropTypes.func,
    onGameOver: PropTypes.func
  };
  anim = new Animated.Value(0);
  dying = new Animated.Value(0);

  spawnLeft = getRandomInt(0, width - 30);
  spawnTop = getRandomInt(0, 200);

  state = {
    emoji: "💩",
    dead: false
  };

  componentDidMount() {
    const initialPosition = Animated.timing(this.anim, {
      toValue: 1,
      easing: Easing.linear,
      duration: 8000 / this.props.baseSpeed,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        this.props.onGameOver();
      }
    });
  }

  handlePress = () => {
    console.debug("test");
    this.anim.stopAnimation();
    this.setState({ emoji: "🚽" });
    Animated.timing(this.dying, {
      useNativeDriver: true,
      toValue: 1
    }).start(() => {
      this.setState({ dead: true });
      this.props.onDead();
    });
  };

  render() {
    if (this.state.dead) {
      return null;
    }

    const transformStyle = {
      position: "absolute",
      top: this.spawnTop,
      left: this.spawnLeft,
      alignItems: "center",
      justifyContent: "center",
      opacity: this.dying.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      transform: [
        {
          translateY: this.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height]
          })
        }
      ]
    };

    return (
      <Animated.View style={[transformStyle]}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={this.handlePress}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 54 }}>{this.state.emoji}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
