import React from 'react'
import { Text, View } from 'react-native';

import LottieView from 'lottie-react-native';

const Slide = ( { heading, lottieFile, description}) => {
  return (
    <View>
    <Text>{heading}</Text>
    <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#ffffff',
        }}
        source={lottieFile}
      />
      <Text>{description}</Text>
      </View>
  )
}

export default Slide;