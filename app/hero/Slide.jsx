import React from 'react'
import { Text, View } from 'react-native';

import LottieView from 'lottie-react-native';

const Slide = () => {
  return (
    <View>
    <Text>We know self improvement is hard.</Text>
    <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('./../../assets/lottie/meditation.json')}
      />
      <Text> Give our app a go and we know that you will find that perfect book</Text>
      </View>
  )
}

export default Slide;