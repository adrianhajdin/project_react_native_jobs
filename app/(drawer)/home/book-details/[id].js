import { Stack, useRouter, useSearchParams, useLocalSearchParams } from "expo-router";
import { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
  Linking,
} from "react-native";

import {
  Book,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../../../components";
import { COLORS, icons, SIZES } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";

import styles from "../../../../components/bookdetails/book/book.style";
import { checkImageURL } from "../../../../utils";
import Stars from "../../../../components/bookdetails/stars/Stars";
import CircularProgressBar from "../../../../components/progressbar/CircularProgressBar";

import * as SecureStore from 'expo-secure-store';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const tabs = ["General Info", "Ratings/Reviews", "Description"];

const BookDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const quesParams = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [favorite, setFavorite] = useState(false); // if results show book to be favorite, then set
  const [favoriteIds, setFavoriteIds] = useState([]);

  const { cat, gen } = quesParams;

  const { data, isLoading, error, refetch } = useFetch(`/getBooks/${params.id}`, {
    cat: cat,
    gen: gen,
  });
  const book = data[0];

  const saveFavorites = async (ids) => {
    await SecureStore.setItemAsync('favorites', ids.join(" "));
  };

  async function getValueFor(key) { // used to get current favorites
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getValueFor("favorites");
        const rawData = value ? value.split(" ") : [];
        setFavoriteIds(rawData);
        setFavorite(rawData.includes(book?.id.toString()));
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, [book?.id]);

  const handleBtnPress = useCallback( async (id, favorite) => { 
    let updatedFavorites = [...favoriteIds];
    if (favorite) {
      updatedFavorites = updatedFavorites.filter(favId => favId !== id.toString());
    } else {
      updatedFavorites.push(id.toString());
    }
    await saveFavorites(updatedFavorites);
    setFavoriteIds(updatedFavorites);
    setFavorite(!favorite);
  }, [favoriteIds]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "General Info":
        return (
          <View style={styles.container}>
            <CircularProgressBar 
              percentage={Math.ceil(book.score[0])}
            />
            <Text>This book is a {Math.ceil(book.score[0])}% match for you!</Text>
            <View style={styles.container}>
              <Text>Authors: {book.authors.join(", ")}</Text>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => Linking.openURL(`https://www.google.com/search?q=${book.authors[0]}`)}>
              (Learn More)
              </Text>
            </View>
            <Text>Genre: {book.genre}</Text>
            <Text>Number of Pages: {book.pageCount}</Text>
            <Text>ISBN: {book.isbn}</Text>
            <Text>Publisher/Date: {book.publisher} {book.publishedDate}</Text>
          </View>
        );

      case "Ratings/Reviews":
        return (
          <View style={styles.container}>
            <Text>General Rating: {book.rating}</Text>
            <Stars />
          </View>
        );

      case "Description":
        return (
          <Text style={{padding:10}}>Description: {book.description}</Text>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.tertiary },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            ><Ionicons name="arrow-back" size={24} color={COLORS.lightWhite} style={{padding: 10}} /></TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            ><AntDesign name="sharealt" size={24} color={COLORS.lightWhite} style={{padding: 10}} /></TouchableOpacity>  
          ),
          headerTitle: "",
        }}
      />
  
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : typeof book === "undefined" ? (
            <Text>No data available</Text>
          ) : (
            
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Book
                score={book.score}
                bookLogo={book.thumbnail}
                title={book.title}
                subtitle={book.subtitle}
                authors={book.authors}
                rating={book.averageRating}
                description={book.description}
                genre={book.genre}
                pageCount={book.pageCount}
                isbn={book.isbn13}
                publisher={book.publisher}
                publishedDate={book.publishedDate}
                country={book.country}
              />
              <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            book?.buyLink === "N/A"
              ? `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(
                  book?.title
                )}`
              : book?.buyLink
          }
          id={book?.id}
          favorite={favorite}
          handleBtnPress={handleBtnPress}
        />
      </>
    </SafeAreaView>
  );
  
};

export default BookDetails;
