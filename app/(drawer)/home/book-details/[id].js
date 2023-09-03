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

import { StyleSheet } from "react-native";

const tabs = ["General Info", "Ratings/Reviews", "Description"];

const tabStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.darkGray,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: COLORS.darkGray,
  },
  linkText: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  section: {
    marginVertical: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarText: {
    marginLeft: 10,
  },
});

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
          <View style={tabStyles.container}>
            <View style={tabStyles.progressBarContainer}>
              <CircularProgressBar
                percentage={Math.ceil(book.score[0])}
              />
              <Text style={tabStyles.progressBarText}>
                This book is a {Math.ceil(book.score[0])}% match for you!
              </Text>
            </View>

            <View style={tabStyles.section}>
              <Text style={tabStyles.header}>Authors</Text>
              <Text style={tabStyles.text}>{book.authors.join(", ")}</Text>
              <Text
                style={tabStyles.linkText}
                onPress={() => Linking.openURL(`https://www.google.com/search?q=${book.authors[0]}`)}
              >
                (Learn More)
              </Text>
            </View>

            <View style={tabStyles.section}>
              <Text style={tabStyles.header}>Details</Text>
              <Text style={tabStyles.text}>Genre: {book.genre}</Text>
              <Text style={tabStyles.text}>Number of Pages: {book.pageCount}</Text>
              <Text style={tabStyles.text}>ISBN: {book.isbn}</Text>
              <Text style={tabStyles.text}>Publisher/Date: {book.publisher} {book.publishedDate}</Text>
            </View>
          </View>
        );

      case "Ratings/Reviews":
        return (
          <View style={tabStyles.container}>
            <Text style={tabStyles.header}>General Rating: {book.rating}</Text>
            <Stars />
          </View>
        );

      case "Description":
        return (
          <View style={tabStyles.container}>
            <Text style={tabStyles.text}>Description: {book.description}</Text>
          </View>
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
