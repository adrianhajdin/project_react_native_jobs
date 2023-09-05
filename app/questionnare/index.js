import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  QuestionTest,
} from "../../components";
import { FlatList, ActivityIndicator, Text} from "react-native";
import useFetch from "../../hook/useFetch";
import { Drawer } from "expo-router/drawer";

const Questionnare = () => {
  return ( // change to white once ready
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: COLORS.gray2 }}> 
      <Drawer.Screen options={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerShadowVisible: false,
        title: "",
      }}
      />
      <QuestionTest />
    </SafeAreaView>
  );
};

export default Questionnare;
