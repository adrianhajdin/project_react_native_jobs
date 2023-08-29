import { useState } from "react";
import { SafeAreaView, ScrollView, View, Button, TouchableOpacity, Text} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  QuestionTest,
  SwiperComponent
} from "../../components"
import RoundButton from "../../components/hero/RoundButton";
import styles from "../../components/jobdetails/footer/footer.style";


const Hero = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("questionnare")
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <SwiperComponent/>
      <RoundButton onPress={handlePress} />
    </SafeAreaView>
  );
};

export default Hero;
