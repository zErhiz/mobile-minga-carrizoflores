import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Intro = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.title}>Open up App.js to start working on your app!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa500",
    alignItems: "center",
    justifyContent: "center",
  },
  container2:{
    flex: 1,
    backgroundColor: "#f01111",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
   color: "#ffff"
  }
});

export default Intro;
