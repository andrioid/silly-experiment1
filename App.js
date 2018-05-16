import React from "react";
import { StyleSheet, Text, View, Animated, Easing, Button } from "react-native";
import { Flag } from "./Flag";
import { FrenchBox } from "./FrenchBox";
import { Blob } from "./Blob";

export default class App extends React.Component {
  anim = new Animated.Value(0);

  state = {
    blobs: [{ id: 1 }, { id: 2 }, { id: 3 }],
    counter: 0,
    score: 0,
    baseSpeed: 1,
    running: true
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
    // delete the dead one, add one more and increase speed
    const idx = this.state.blobs.findIndex(v => v.id === id);
    if (idx !== -1) {
      // delete the old one from array
      this.setState(state => {
        state.blobs.splice(idx, 1); // I'm not happy with this
        return {
          score: state.score + 1,
          baseSpeed: state.baseSpeed + 0.1,
          blobs: state.blobs
        };
      });
    }
  };

  handleGameOver = () => {
    this.setState({ running: false, baseSpeed: 1 });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.running ? (
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            {this.state.blobs.map(b => (
              <Blob
                key={b.id}
                onDead={() => this.handleDead(b.id)}
                baseSpeed={this.state.baseSpeed}
                onGameOver={this.handleGameOver}
              />
            ))}
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>Game Over</Text>
            <Text>Your score: {this.state.score}</Text>
            <Button
              title="Restart"
              onPress={() => {
                this.setState({ running: true, score: 0 });
              }}
            />
          </View>
        )}
        <View>
          <Text style={{ fontSize: 24 }}>{this.state.score}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3"
  }
});
