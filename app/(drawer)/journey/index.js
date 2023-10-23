import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Avatar, Button, Icon, Slider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONT, SIZES } from '../../../constants';
import Slide from '../../../components/hero/Slide';

import Stencil from '../../../components/journey/Stencil';
import Path1 from '../../../components/journey/Path1';
import Journey1 from '../../../components/journey/Journey1';
import Journey2 from '../../../components/journey/Journey2';
import Journey3 from '../../../components/journey/Journey3';
import Journey from '../../../components/journey/Journey';

const JourneyPage = () => {
  return (
    // <ScrollView  showsVerticalScrollIndicator={false}>
      
    //   {/* <View style={styles.journeysContainer}>
    //     <Journey3 />
    //     <Journey1 /> 
    //     <Journey2 />
    //     <Journey1 /> 
    //   </View> */}

    // </ScrollView>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Journey />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JourneyPage;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: { //here
      fontSize: SIZES.xxLarge,
      fontFamily: FONT.bold,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
    },
    subheading: { // here
      fontSize: SIZES.xLarge,
      fontFamily: FONT.bold,
      fontWeight: 'bold',
      marginTop: 20,
    },
    subtitle: { // here
      fontSize: SIZES.large,
      fontFamily: FONT.medium,
      fontWeight: 'bold',
      marginTop: 20,
    },
    section: {
      marginVertical: 10,
    },
    text: { // here
      fontSize: SIZES.medium,
      fontFamily: FONT.regular,
      lineHeight: 24,
      marginVertical: 10,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    journeySlide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
  },
  allJourneysContainer: {
    alignItems: 'right',
    flex: 1,
  },
  scrollContent: {
    padding: 0,
    margin: 0,
  },
  journeysContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
},
journey: {
    position: 'absolute',
},

  });