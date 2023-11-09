import { useState } from "react";
import { SafeAreaView, ScrollView, View, Button, TouchableOpacity, Text, ActivityIndicator} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

import { COLORS, icons, images, SIZES } from "../../constants";
import {
  Nearbyjobs,
  Popularjobs,
  Welcome,
  QuestionTest,
  SwiperComponent
} from "../../components"
import RoundButton from "../../components/hero/RoundButton";
import { Drawer } from "expo-router/drawer";

import uuid from 'react-native-uuid';

import { updateUser, saveLocalData, migrateData } from '../../hook/storageHelpers';

const Hero = () => {
  const router = useRouter();

  const data = useLocalSearchParams();
  const { legacyUser, initialUpdates } = data;

  const handlePress = () => {
    // Create new uuidv4 when user is done with hero page

    const uuidv4 = uuid.v4();
    console.log(`Deteced new user, created uuid: ${uuidv4}`)

    const updates = {
      "key" : uuidv4,
      "name" : initialUpdates?.name ?? "",
      "cat" : initialUpdates?.cat ?? "",
      "gen" : initialUpdates?.gen ?? "",
      "favorites" : initialUpdates?.favorites ?? [],
      "booksRead" : [],
      "booksReading" : [],
      "booksOpened" : 0,
      "modal" : {
        "initial" : false,
        "v1.1" : false
      }
    }
    console.log(`legacyUser status: ${legacyUser}`);
    if (legacyUser === true) {
      migrateData(uuidv4, updates)
      .then(() => {
        console.log("Migrated legacy user to new database.")
      })
    } else {
      updateUser(uuidv4, updates) // initializing user
      .then(() => {
        saveLocalData("uuidv4", uuidv4)
        .then(() => {
          console.log(`Saved uuid locally: ${uuidv4}`);
        })
      })
    }
    
    router.push("questionnare");
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
