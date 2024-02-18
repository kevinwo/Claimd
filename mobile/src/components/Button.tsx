import { Theme, useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  progress?: number; // 0 to 1 for determinate, undefined for indeterminate
  indeterminateProgress?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', progress, indeterminateProgress }) => {
  const [progressAnim] = useState(new Animated.Value(0)); // Animation value for progress
  const theme = useTheme()
  const styles = getStyles(type, theme);

  useEffect(() => {
    if (!indeterminateProgress && typeof progress === 'number') {
      Animated.timing(progressAnim, {
        toValue: progress ?? 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (typeof progress === 'number' && progress === 1) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, indeterminateProgress, progressAnim]);

  const onButtonPress = () => {
    if (indeterminateProgress) {
      Animated.timing(progressAnim, {
        toValue: 0.9,
        duration: 5000,
        useNativeDriver: false,
      }).start();
    }

    onPress()
  }

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <Pressable
      onPress={onButtonPress}
      style={({ pressed }) => [
        styles.base,
        styles[type],
        pressed && styles.pressed
      ]}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.progress, { width: widthInterpolated }]} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const getStyles = (type: string, theme: Theme) => {
  const { colors, dark } = theme

  return StyleSheet.create({
    base: {
      padding: 18,
      borderRadius: 8,
      marginVertical: 5,
      width: '100%',
      alignSelf: 'center',
    },
    primary: {
      backgroundColor: '#4CAF50',
    },
    secondary: {
      backgroundColor: 'transparent',
    },
    text: {
      color: type === 'primary' ? '#fff' : colors.text,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },
    pressed: {
      opacity: 0.75,
    },
    progress: {
      position: 'absolute',
      height: '100%',
      borderRadius: 30,
      backgroundColor: dark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)', // Change color for progress indicator
    },
  });
}

export default Button;
