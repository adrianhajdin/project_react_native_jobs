import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter} from "expo-router";
import { useState, useEffect, useCallback } from "react";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import * as SecureStore from 'expo-secure-store';

import {fetchLocalData} from "../../../hook/storageHelpers"

export default function FavoritesPage() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [favoriteIds, setFavoriteIds] = useState([]);

  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch() // do not need to refetch data, but favoriteIds!
    initializeData();
    setRefreshing(false);
  }, []);

  // Hooks

  const { data, isLoading: apiIsLoading, error, refetch } = useFetch('/getBooks', { cat, gen });
  

  // Load initial data and set states
  const initializeData = useCallback(async () => {
    try {
      // Fetch UUID and local data
      const uuid = await fetchLocalData("uuidv4"); // dont need uuid4 because using locally
      const localData = await fetchLocalData(uuid); // Adjust this if fetchLocalData doesn't need uuid

      // Set local data states
      setFavoriteIds(localData.favorites);
      setCat(localData.cat);
      setGen(localData.gen);

    } catch (error) {
      console.error("An error occurred while initializing data:", error);
      // Optionally set an error state to display an error message to the user
    }
  }, []); // If you use any external values in this function, they should be added to the dependency array

  useEffect(() => {
    initializeData();
  }, [initializeData]); // Run this effect when the component mounts

  useEffect(() => {
    if (data?.length != 0) {
      setIsLoading(false); // Set loading to false since data is loaded
    }
  }, [apiIsLoading]); // This effect runs whenever the loading state or data from the API changes

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerLeft: () => <DrawerToggleButton tintColor={COLORS.lightWhite} />,
          title: '',
        }}
      />
      <FlatList
        data={data.filter((item) => favoriteIds?.includes(item.id))}
        renderItem={({ item }) => (
          <NearbyJobCard
            book={item}
            handleNavigate={() =>
              router.push({
                pathname: `(drawer)/home/book-details/${item.id}`,
                params: { cat: cat, gen: gen },
              })
            }
          />
        )}
        keyExtractor={(book) => book.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ rowGap: SIZES.medium, padding: SIZES.medium}}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Ionicons
                name='heart'
                size={50}
                color={COLORS.primary}
                style={styles.icon}
              />
              <Text style={styles.searchTitle}>Favorites</Text>
              <Text style={styles.noOfSearchedJobs}>All Books</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
              ) : error && <Text>Oops something went wrong</Text>}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}