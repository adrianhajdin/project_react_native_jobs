import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter} from "expo-router";
import { useState, useEffect } from "react";
import { NearbyJobCard } from "../../../components";
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import * as SecureStore from 'expo-secure-store';

export default function FavoritesPage() {

  const router = useRouter();

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cat, setCat] = useState("");
  const [gen, setGen] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  // TESTING
  const testData = false;

  async function save(key, value) { // only used for test cases
      await SecureStore.setItemAsync(key, value);
  }

  if (testData) {
    save("favorites", "uNMjeFMorPgC Xh2rEAAAQBAJ R2cqDAAAQBAJ"); // if we would just like to see app working
  }
  // TESTING


  async function getValueFor(key) { // used to get current favorites
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const loadFavorites = () => {
    getValueFor("favorites")
      .then((rawData) => {
        setFavorites(rawData ? rawData.split(" ") : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
      });
  };

  const loadData = () => {
    setRefreshing(true);
    // Fetch favorites
    loadFavorites();
    setRefreshing(false);
  };

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("data")
    .then((value) => {
        const data = value.split("*")[1];
        setCat(data.substring(0,24));
        setGen(data.substring(24))
        setIsLoading(false);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
    });

     // Fetch favorites initially
     loadFavorites();
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
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <FlatList
              data={data.filter(item => favorites.includes(item.id))}
              renderItem={({ item }) => (
                    <NearbyJobCard
                        book={item}
                        handleNavigate={() => router.push({
                            pathname: `(drawer)/home/book-details/${item.id}`,
                            params: {cat: cat, gen: gen}
                        })}
                    />
                )}
                keyExtractor={(book) => book.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Ionicons name="heart" size={50} color={COLORS.primary} style={styles.icon} />
                            <Text style={styles.searchTitle}>Favorites</Text>
                            <Text style={styles.noOfSearchedJobs}>All Books</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : error && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}