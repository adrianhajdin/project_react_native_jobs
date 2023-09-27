import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONT, SIZES } from '../../../constants';
import Slide from '../../../components/hero/Slide';



const JourneyPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen options={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerShadowVisible: false,
        headerLeft: () => (
          <DrawerToggleButton 
            tintColor={COLORS.lightWhite}
          />
        ),
        title: "",
      }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
      <Slide style={styles.journeySlide}
          heading={"Introducing your personalized reading journey."}
          lottieFile={ require("./../../assets/lottie/journey.json")}
          description={"We would set up a path of books to read, specific to your level of experience and interests, ultimately guiding you in the right direction. Additionally, we would create a rewards/points system that motivates you to keep reading and stay on your journey."}
        />
        <Text>Let us know what you think! Your responses are very important to us, as we will use them to tailor how we build the feature. They are also anonymous, so be as honest as you would like!</Text>
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default JourneyPage;

const styles = StyleSheet.create({
    journeySlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    }
  });
