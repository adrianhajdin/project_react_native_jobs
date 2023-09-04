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
import { Drawer } from "expo-router/drawer";

const Hero = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("questionnare")
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.tertiary },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
      <SwiperComponent/>
      <RoundButton onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

export default Hero;
