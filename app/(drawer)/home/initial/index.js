import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

const Initial = () => {

    const showQues = true;
    const cat = "342341554232322443332222";
    const gen = "323";

    const router = useRouter();

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

    if (showQues) {
        save("data", "");
    } else {
        save("data", `${cat} ${gen}`);
    }
    
    // State to hold the value of the Promise
    const [promiseValue, setPromiseValue] = useState(null);
    
    // State to hold loading status
    const [isLoading, setIsLoading] = useState(true);

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

    // Show a loading indicator while the Promise is being resolved
    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        );
    }

    // Show different screens based on the value of the Promise
    if (promiseValue === "") {
        router.push("hero");
    } else {
        router.push("home");
    }
};

export default Initial;
