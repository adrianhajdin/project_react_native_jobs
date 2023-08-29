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
        <Slide 
          heading={"We know that self improvemnt is hard."}
          lottieFile={ require("../../assets/lottie/meditation.json")}
          description={"Give our app a go and see for yourself"}
        />
         <Slide 
          heading={"We know that self improvemnt is hard."}
          lottieFile={ require("../../assets/lottie/read.json")}
          description={"Give our app a go and see for yourself"}
        />
        <Slide 
          heading={"We know that self improvemnt is hard."}
          lottieFile={ require("../../assets/lottie/weight.json")}
          description={"Give our app a go and see for yourself"}
        />
      </Swiper>
    )
  }
}