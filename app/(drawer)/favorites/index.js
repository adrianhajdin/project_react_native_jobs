import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from "react-native";
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


  // TESTING
  const testData = false;

  async function save(key, value) { // only used for test cases
      await SecureStore.setItemAsync(key, value);
  }

  if (testData) {
    save("favorites", "uNMjeFMorPgC Xh2rEAAAQBAJ R2cqDAAAQBAJ"); // if we would just like to see app working
  }
// TESTING

  // BOTH these handled at book details? (SAVE)
  //method to save each new book to favorites
  // as well as method to clean up favorites

  // handle UI with both of these methods

  // Method 1
  // onPress --> call save function (if it is the add, just add)
  //Method 2 
  // onpress --> call delte function, removing it and reuploading the value. If not in item, then just do nothing 

  //LOAD
  // need to load from "favorites"
  // unpack values, splitting by " "
  // call API to get all data
  // filter through data to only display APIs needed (similar to seacrch fucntion, set new variable?)

  async function getValueFor(key) { // used to get current favorites
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

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
  }, []);

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("favorites")
    .then((rawData) => {
        setFavorites(rawData.split(" "));
        setIsLoading(false);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
        setIsLoading(false);
    });
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
      <ScrollView showsVerticalScrollIndicator={false}>
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