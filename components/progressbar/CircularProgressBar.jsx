import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FONT, SIZES } from '../../constants';

const CircularProgressBar = ({ percentage, size, big }) => {
  const [fillValue, setFillValue] = useState(0);

  useEffect(() => {
    // Initialize the animation
    let start = Date.now();
    let from = fillValue;
    let to = percentage;

    if (from === to) {
      return;
    }

    // Animate over 600 ms
    let duration = 600;

    let animate = () => {
      let now = Date.now();
      let currentTime = now - start;
      let progress = Math.min(currentTime / duration, 1);

      let easeOutBounce = (progress) => {
        // Implement or import an easeOutBounce function
        // This is just a placeholder
        return progress;
      };

      let currentFill = easeOutBounce(progress) * (to - from) + from;

      setFillValue(currentFill);

      if (currentFill < to) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage]);

  return (
    <AnimatedCircularProgress
      size={size ?? 60}
      width={big ? 15 : 7}
      fill={fillValue} // use non-animated state value
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
