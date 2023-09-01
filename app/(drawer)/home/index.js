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

  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");
  const [name, setName] = useState("");
  
  // TESTING
  const showQues = false;
  const testData = false;

  async function save(key, value) { // only used for test cases
    await SecureStore.setItemAsync(key, value);
}

if (showQues) { // if we want to show questionnare and restart
  save("data", "");
} else if (testData) {
  save("data","Reader*34234155423232244333111"); // if we would just like to see app working
}
// TESTING

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("🔐 Here's your value 🔐 \n" + result);
    } else {
      console.log('No values stored under that key.');
    }
    return result;
  }

  
  

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("data")
    .then((value) => {
        setPromiseValue(value);
        const [name, data] = value.split("*");
        setCat(data.substring(0,24));
        setGen(data.substring(24))
        setName(name);
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
        headerStyle: { backgroundColor: COLORS.tertiary },
        headerShadowVisible: false,
        headerLeft: () => (
          <DrawerToggleButton 
            tintColor={COLORS.lightWhite}
          />
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
              router.push({
                pathname: "(drawer)/home/search",
                params: {cat: cat, gen: gen}
              });
            }}
            cat={cat}
            gen={gen}
            name={name}
          />
          <Popularjobs 
            cat={cat}
            gen={gen}
          />
          <Nearbyjobs 
            cat={cat}
            gen={gen}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )};
};

export default Page;
