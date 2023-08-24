import React, { Component } from 'react'
import {StyleSheet, Text, View, Button } from 'react-native'

import Swiper from 'react-native-swiper'
import Slide from './Slide'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <Slide style={styles.slide1}
          heading={"We know that self-improvement is hard..."}
          lottieFile={ require("./../../assets/lottie/meditation.json")}
          description={"ReadAI is here to help you!"}
        />
         <Slide style={styles.slide2}
          heading={"We know that self-improvement is hard..."}
          lottieFile={ require("./../../assets/lottie/read.json")}
          description={"ReadAI is here to help you!"}
        />
        <Slide style={styles.slide3}
          heading={"We know that self-improvement is hard..."}
          lottieFile={ require("./../../assets/lottie/weight.json")}
          description={"ReadAI is here to help you!"}
        />
      </Swiper>
    )
  }
}