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
import SurveyScreen from "../../components/home/question/SurveyScreen";

const Questionnare = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/questions", {});

  return ( // change to white once ready
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: COLORS.lightWhite }}> 
      {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <SurveyScreen 
            router={router}
            survey={data}
          />
        )}
    </SafeAreaView>
  );
};

export default Questionnare;
