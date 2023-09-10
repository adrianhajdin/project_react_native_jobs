import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FONT, SIZES } from '../../constants';

const CircularProgressBar = ({ percentage, size, big }) => {
  const fillValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fillValue, {
      toValue: percentage,
      duration: 600,  // 2 seconds, but can be adjusted
      easing: Easing.bounce,  // bounce effect
      useNativeDriver: false,  // this needs to be false for react-native-circular-progress
    }).start();
  }, [percentage]);

  return (
    <AnimatedCircularProgress
      size={size ?? 60}
      width={big ? 15 : 7}
      fill={fillValue}  // using animated value
      tintColor="#1BCC32"
      backgroundColor="transparent"
      lineCap="round">
      {
        (fill) => (
          <Text style={{fontSize: big ? SIZES.xxLarge : SIZES.medium, fontFamily: big ? FONT.medium : FONT.regular}}>
            { Math.round((fill / 100) * 99) + "%" }
          </Text>
        )
      }
    </AnimatedCircularProgress>
  );
};

export default CircularProgressBar;