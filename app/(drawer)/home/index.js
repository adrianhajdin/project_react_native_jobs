import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, ActivityIndicator, Modal, Text, TouchableOpacity, StyleSheet, Button, Linking } from "react-native";
import { Stack, useRouter, Link, useLocalSearchParams, Redirect } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  Welcome,
  InfoModal
} from "../../../components";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

import {fetchLocalData, legacyUser} from "../../../hook/storageHelpers"

const Page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");

  const [updates, setUpdates] = useState(null)

  useEffect(() => {
    // will remove this code once all users are migrated
    legacyUser()
    .then((promiseValue) => { // checking if data needs to be migrated
      setUpdates(promiseValue);
      return (promiseValue != null)
    })
    .then((isLegacyUser) => {
      if (isLegacyUser) {
        console.log("Deteced legacy user, pushing to hero/update page.")
        router.push({
          pathname: "hero",
          params: {legacyUser: true, updates: updates}
        });
      } else {
        fetchLocalData("uuidv4") // original logic, if null go to hero
        .then((uuidv4) => {
            if (uuidv4 == null) {
              router.push({
                pathname: "hero",
                params: {legacyUser: false, updates: null}
              });
            } else {
                fetchLocalData(uuidv4)
                .then((data) => {
                  setName(data.name);
                  setCat(data.cat);
                  setGen(data.gen)
                  setIsLoading(false);
                })
            }
        })
      }
    })
  }, []);

  
  if (isLoading) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
  }

    return (
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
          >
            <InfoModal />
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