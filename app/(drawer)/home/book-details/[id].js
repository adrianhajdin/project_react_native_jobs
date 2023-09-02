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

  async function save(key, value) { // used to update if favorite
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) { // used to get current favorites
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  useEffect(() => {
    // Assuming `yourPromiseFunction` is the function that returns your Promise
    getValueFor("favorites")
    .then((value) => {
        const rawData = value.split(" ")
        setFavoriteIds(rawData);
        setFavorite(rawData.includes(book?.id))
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });
  }, []);

  const handleBtnPress = (id, favorite) => { 
    if (favorite) { // if favorite is true, then we are unliking. This is for deletion
      if (favoriteIds.includes(id)) {
        const index = favoriteIds.indexOf(id);
        if (index !== -1) {
          save("favorites", (favoriteIds.splice(index, 1)).join(" "))
        }
      }
      setFavorite(false); // chaning updated value
    } else { // if favorite is false, then we are liking, this is adding
      if (!favoriteIds.includes(id)) { // don't add if already in there
        save("favorites", [...favoriteIds, id].join(" "))
      }
      setFavorite(true); // chaning updated value
    }
  }

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
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (typeof book === "undefined") ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Book // here is the screen that will show up on every tab -- remove props that you don't want (so just keep title)
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

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter 
          url={(book?.buyLink === "N/A") ? `https://www.google.com/search?tbm=bks&q=${encodeURIComponent(book?.title)}` : book?.buyLink}
          id={book?.id} // need for passing back
          favorite={favorite} //
          handleBtnPress={handleBtnPress}
        
        />
      </>
    </SafeAreaView>
  );
};

export default BookDetails;
