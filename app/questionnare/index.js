import { useState } from "react";
import { SafeAreaView, ScrollView, View} from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  Question,
} from "../../components";
import { FlatList, ActivityIndicator, Text} from "react-native";
import useFetch from "../../hook/useFetch";
import { Drawer } from "expo-router/drawer";
import Header from "../../components/home/question/Header";

const Questionnare = () => {
  return ( // change to white once ready
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: COLORS.lightWhite }}> 
      <Question />
    </SafeAreaView>
  );
};

export default Questionnare;
