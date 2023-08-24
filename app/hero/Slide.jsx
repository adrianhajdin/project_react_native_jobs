import React from 'react'
import { Text, View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const Slide = ( { heading, lottieFile, description}) => {
  return (
    <View>
    <Text style={styles.baseText}>{heading}</Text>
    <LottieView
        autoPlay
        loop
        style={{
          width: 375,
          height: 375,
          backgroundColor: '#ffffff',
          alignContent: 'center',
        }}
        source={lottieFile}
      />
      <Text style={styles.lowerText}>{description}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'orange',
    paddingLeft: 10,
    paddingTop: 10,
  },
  lowerText: {
    fontSize: 20,
    color: 'orange',
    paddingLeft: 10,
    paddingTop: 10,
  },
});


export default Slide;