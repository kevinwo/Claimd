import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';

const SpinningCard: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.card,
          transform: [{ rotateY: spin }],
        }}
      >
        <View style={styles.textWrapper}>
          <Image style={styles.image} source={require('./logo.png')} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: '25%',
    resizeMode: 'contain',
  },
  card: {
    width: 150,
    height: 250,
    backgroundColor: '#cccccc',
    backfaceVisibility: 'hidden',
    elevation: 20,
    shadowColor: '#52006A',
    borderRadius: 16,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
  }
});

export default SpinningCard;
