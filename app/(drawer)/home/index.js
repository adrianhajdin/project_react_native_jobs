import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, ActivityIndicator, Modal, Text, TouchableOpacity, StyleSheet, Button, Linking } from "react-native";
import { Stack, useRouter, Link, useLocalSearchParams, Redirect } from "expo-router";
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
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';



const Page = () => {
  const router = useRouter();
  const [promiseValue, setPromiseValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");
  const [name, setName] = useState("");
  
  // TESTING
  const showQues = true;
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
    return result;
  }

  
  

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("data")
    .then((value) => {
        setPromiseValue(value);
        const [name, data] = value.split("*");
        setCat(data?.substring(0,24));
        setGen(data?.substring(24))
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

    return (
    promiseValue === "" ? 
    <Redirect href="/hero" /> : 
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View>
        <Drawer.Screen options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerLeft: () => (
            <DrawerToggleButton 
              tintColor={COLORS.lightWhite}
            />
          ),
          headerRight: () => (
            <AntDesign 
            name="questioncircleo" 
            size={24} 
            color={COLORS.lightWhite} 
            style={{padding: 10}} 
            onPress={() => setModalVisible(true)}
            />
          ),
          title: "",
        }}
        />
      </View>
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
          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            ><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                  width: "85%",
                  backgroundColor: COLORS.secondary,  // <-- set background color
                  padding: 40,
                  borderRadius: 10,
                  // Add shadow style for iOS
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  // Add shadow style for Android
                  elevation: 5,
                }}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                    onPress={() => setModalVisible(false)}
                  ><AntDesign name="close" size={24} color={COLORS.lightWhite} /></TouchableOpacity>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{ color: COLORS.lightWhite, fontSize: 20 }}>How We Use Your Data</Text>
                  </View>
                  <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    ReadAI only asks the questions most relevant to maximize your self-improvement journey. To learn more visit our privacy policy <Text style={{ color: COLORS.tertiary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.termsfeed.com/live/9b007a78-2d35-4e2d-bf53-d8dd2c5af8d3')}>here</Text>
                    .
                  </Text>
                </View>
              </View>
          </Modal>
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

export default Page;