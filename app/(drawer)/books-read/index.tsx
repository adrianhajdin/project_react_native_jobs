import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONT, SIZES } from '../../../constants';


// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const AboutPage = () => {
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
      <Text>Books Read</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};


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
});

export default AboutPage;