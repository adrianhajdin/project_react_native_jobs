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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            >   
                <AntDesign name="close" size={24} color={COLORS.lightWhite} />
            </TouchableOpacity>

            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{ color: COLORS.lightWhite, fontSize: 30 }}>What we mean by 'AI Tools'</Text>
            </View>

            <ScrollView style={{height: 400}}>
                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 20 }}>How it works</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Our present pipline is to give Chat-GPT 4 model the role of an experienced book reviewer and ask to rate all of the books based on each of the topics. Then we take the cosine similarity between ChatGPT's answer and each user's individual prefences (in the form of two vectors). Finally we map the data to a percentage that represents how close the book is to the user. If you don't understnad this that is fine, we would like to include it for the people who are curious!
                </Text>
                
                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 10 }}>What this means</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Currently, we do not have enough customer data to create a reliable neural network or machine learning model. Our algorithm is no better than just asking ChatGPT what books you should read! We know this is not ideal for what you might have envisioned about our app, but we wish to expand our model in the future, to  take information from real sources like active users and scraping data from Reddit. 
                </Text>

                <Text style={{ color: COLORS.tertiary, fontSize: 20, marginTop: 20 }}>What can I do?</Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>
                    Getting more active users is probably the best way we can improve our algoritm. Help us do so by spreading awareness, and we can bring knowlegde/learning to communites around us together!
                </Text>


                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>If you would like to know more, you can look at our GitHub repo <Text style={{ color: COLORS.tertiary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://github.com/omrajpal/read_ai')}>here</Text>.
                </Text>

                <Text style={{ color: COLORS.lightWhite, marginTop: 10 }}>If you would like to see how we use your data, you can view our privacy policy <Text style={{ color: COLORS.tertiary, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.termsfeed.com/live/9b007a78-2d35-4e2d-bf53-d8dd2c5af8d3')}>here</Text>.
                </Text>
            </ScrollView>
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