import { Stack, useRouter, useSearchParams, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
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



const tabs = ["General Info", "Ratings/Reviews", "Description"];

const BookDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const quesParams = useLocalSearchParams();
  const { cat, gen } = quesParams;

  const { data, isLoading, error, refetch } = useFetch(`/getBooks/${params.id}`, {
    cat: cat,
    gen: gen,
  });
  const book = data[0];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);



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
            <View style={styles.logoBox}>
              <Image
                source={{
                  uri: checkImageURL(book.bookLogo)
                    ? book.bookLogo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                style={styles.logoImage}
              />
            </View>

            <View style={styles.jobTitleBox}>
              <Text style={styles.jobTitle}>{book.title}</Text>
            </View>

            <View style={styles.companyInfoBox}>
              <Text style={styles.companyName}>{book.subtitle}</Text>
            </View>
            <Text>Authors: {book.authors.join(", ")}</Text>
            <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(`https://www.google.com/search?q=${book.authors[0]}`)}>
            Click here to learn more about the author!
            </Text>
            <Text>Genres: {book.genre}</Text>
            <Text>pageCount: {book.pageCount}</Text>
            <Text>ISBN: {book.isbn}</Text>
            <Text>Publisher/Date: {book.publisher} {book.publishedDate}</Text>
            <Text>Country: {book.country}</Text>
          </View>
        );

      case "Ratings/Reviews":
        return (
          <View style={styles.container}>
            <Text>Rating: {book.rating}</Text>
            <Stars />
          </View>
        );

      case "Description":
        return (
          <Text>Description: {book.description}</Text>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
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

        <JobFooter url={(book?.buyLink === "N/A") ? 'https://books.google.com/':book?.buyLink} />
      </>
    </SafeAreaView>
  );
};

export default BookDetails;
