import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, ActivityIndicator } from "react-native";
import { Stack, useRouter, Link, useLocalSearchParams } from "expo-router";
import * as SecureStore from 'expo-secure-store';

import { COLORS, icons, images, SIZES } from "../../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  QuestionTest
} from "../../../components";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';



const Page = () => {
  const router = useRouter();
  const [promiseValue, setPromiseValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useLocalSearchParams();
  const { cat, gen } = params;

  const showQues = false;
  const testData = false;
  const test_cat = "342341554232322443332222";
  const test_gen = "111";

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log('No values stored under that key.');
    }
    return result;
  }

  async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
  }

  if (cat != null && gen != null) { // if questionnare data recieved
    save("data", (cat + gen));
  } 
  
  if (showQues) { // if we want to show questionnare and restart
    save("data", "");
  }

  if (testData) {
    save("data", `${test_cat} ${test_gen}`); // if we would just like to see app working
  }
  

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("data")
    .then((value) => {
        setPromiseValue(value);
        setIsLoading(false);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
    });
  }, []);


  if (isLoading) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
  }


  if (promiseValue === "") {
      router.push("hero");
  } else { 
    return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerLeft: () => (
          <DrawerToggleButton />
        ),
        title: "",
      }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            handleClick={() => {
              router.push('(drawer)/home/search/test')
            }}
            cat={promiseValue.split(" ")[0]}
            gen={promiseValue.split(" ")[1]}
          />
          <Popularjobs 
            cat={promiseValue.split(" ")[0]}
            gen={promiseValue.split(" ")[1]}
          />
          <Nearbyjobs 
            cat={promiseValue.split(" ")[0]}
            gen={promiseValue.split(" ")[1]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )};
};

export default Page;
