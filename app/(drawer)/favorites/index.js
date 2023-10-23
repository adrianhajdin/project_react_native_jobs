import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter} from "expo-router";
import { useState, useEffect } from "react";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import * as SecureStore from 'expo-secure-store';

import {fetchLocalData} from "../../../hook/storageHelpers"

export default function FavoritesPage() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");

  const [uuidv4, setUuidv4] = useState("");

  const fetchUuidv4 = async () => {
    // Assuming uuidv4 is available in the function's scope. If not, it needs to be passed as a parameter.
    if (uuidv4 === "") {
      try {
        // Await the fetchLocalData promise and store its result.
        const localUuidv4 = await fetchLocalData("uuidv4");
        setUuidv4(localUuidv4);
        return localUuidv4;
      } catch (error) {
        // Handle or throw errors from fetchLocalData.
        console.error('Error fetching local data:', error);
        throw error; // Rethrow if you want this error to be catchable by the caller of fetchUuidv4.
      }
    } else {
      return uuidv4;
    }
  }

  const loadData = async () => {
    fetchUuidv4()
    .then((uuidv4) => {
      fetchLocalData(uuidv4)
        .then((data) => {
          setFavorites(data.favorites);
          setCat(data.cat);
          setGen(data.gen);
        })
    })
  };

  const refreshData = () => {
    setRefreshing(true);
    loadData()
    .then(() => {
      setRefreshing(false);
    })
  }


  useEffect(() => {
    loadData()
    .then(() => {
      console.log("Favorites data initially loaded.")
    })
  }, []);
  
  const { data, apiIsLoading, error } = useFetch("/getBooks", {
    cat: cat,
    gen: gen,
  });
  
  useEffect(() => {
    setIsLoading(apiIsLoading);
  }, [apiIsLoading]);

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
        data={data.filter((item) => favorites?.includes(item.id))}
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
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
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
        ListEmptyComponent={<Text>No favorites found! Add to me!</Text>}
      />
    </SafeAreaView>
  );
}