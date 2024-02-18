import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const WelcomeText = () => {
  // Opacity values for each line of text
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence to fade in each text line with a 250ms delay between them
    Animated.sequence([
      Animated.timing(opacity1, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(250),
      Animated.timing(opacity2, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(250),
      Animated.timing(opacity3, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity1, opacity2, opacity3]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fadeInView, { opacity: opacity1 }]}>
        <Text style={styles.text}>You've got</Text>
      </Animated.View>
      <Animated.View style={[styles.fadeInView, { opacity: opacity2 }]}>
        <Text style={styles.text}>a new</Text>
      </Animated.View>
      <Animated.View style={[styles.fadeInView, { opacity: opacity3 }]}>
        <Text style={styles.text}>membership.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  fadeInView: {
    // Adjust as needed for your design
  },
  text: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default WelcomeText;
