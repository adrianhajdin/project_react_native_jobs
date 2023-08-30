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

const Questionnare = () => {
  const { data, isLoading, error } = useFetch("/questions", {});
  console.log(data);

  const renderItem = ({ item }) => (
    <Text>{item.Question}</Text>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingLeft: 10, backgroundColor: COLORS.lightWhite }}>
      <QuestionTest />

      <View>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          <FlatList
            data={data.items}
            renderItem={renderItem}
            keyExtractor={item => item.Topic}
            vertical
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Questionnare;
