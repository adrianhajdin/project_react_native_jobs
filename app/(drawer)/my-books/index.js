import { Text, View, SafeAreaView, ScrollView, FlatList, SectionList, ActivityIndicator, RefreshControl } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter} from "expo-router";
import { useState, useEffect, useCallback } from "react";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import * as SecureStore from 'expo-secure-store';
import SearchButton from "../../../components/home/welcome/SearchButton";
// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

import {fetchLocalData} from "../../../hook/storageHelpers"
import AlreadyReadHeader from "../../../components/bookdetails/header/AlreadyReadHeader";

const BooksReadPage = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const [booksReadIds, setBooksReadIds] = useState([]);
  const [booksReadingIds, setBooksReadingIds] = useState([]);
  const [myBooks, setMyBooks] = useState([])


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
      const uuid = await fetchLocalData("uuidv4");
      const localData = await fetchLocalData(uuid); // Adjust this if fetchLocalData doesn't need uuid

      // Set local data states
      setBooksReadIds(localData.booksRead);
      setBooksReadingIds(localData.booksReading);

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

      setMyBooks([ {
        "title" : "Reading",
        "data" : data.filter((item) => booksReadingIds.includes(item.id)),
      },{
        "title" : "Read",
        "data" : data.filter((item) => booksReadIds.includes(item.id)),
        }
      ])

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
      <SectionList
        sections={myBooks}
        renderItem={({ item }) => (
          <NearbyJobCard
            book={item}
            handleNavigate={() =>
              router.push({
                pathname: `(drawer)/home/book-details/${item.id}`,
                params: { cat: cat, gen: gen },
                back: {}
              })
            }
          />
        )}
        keyExtractor={(book) => book.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ rowGap: SIZES.medium, padding: SIZES.medium}}
        renderSectionHeader={({section: {title}}) => (
          <AlreadyReadHeader 
            text={title}
            bookState={title == "Read" ? 2 : 1}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <MaterialCommunityIcons 
                name="bookshelf" 
                size={50} 
                color={COLORS.primary}
                style={styles.icon} 
                />
              <Text style={styles.searchTitle}>My Books</Text>
              {/* <SearchButton 
                onPress={handleSearchClick}
                searchText={"Search for a book you've read!"}
              /> */}
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
};

export default BooksReadPage;