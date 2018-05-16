import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { Flag } from "./Flag";
import { FrenchBox } from "./FrenchBox";
import { Blob } from "./Blob";

export default class App extends React.Component {
  anim = new Animated.Value(0);

  state = {
    blobs: [{ id: 1 }, { id: 2 }],
    counter: 0
  };

  addBlob = () => {
    const newBlobId = `blob-${this.state.counter}`;
    const newBlobs = this.state.blobs.slice();
    newBlobs.push({ id: newBlobId });
    this.setState(state => {
      return {
        blobs: newBlobs,
        counter: state.counter + 1
      };
    });
    console.debug(newBlobs);
  };

  handleDead = id => {
    this.addBlob();
    // delete the dead one, add two more
    const idx = this.state.blobs.findIndex(v => v.id === id);
    if (idx !== -1) {
      // delete the old one from array
      this.setState(state => {
        state.blobs.splice(idx, 1); // I'm not happy with this
        return {
          ...state
        };
      });
    }
  };

  handleGameOver = () => {
    alert("Game over");
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.blobs.map(b => (
          <Blob
            key={b.id}
            onDead={() => this.handleDead(b.id)}
            onGameOver={this.handleGameOver}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
