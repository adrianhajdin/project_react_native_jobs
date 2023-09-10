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
import { COLORS, icons, SIZES, FONT } from "../../../../constants";
import useFetch from "../../../../hook/useFetch";

import styles from "../../../../components/bookdetails/book/book.style";
import { checkImageURL } from "../../../../utils";
import Stars from "../../../../components/bookdetails/stars/Stars";
import CircularProgressBar from "../../../../components/progressbar/CircularProgressBar";

import Score from "../../../../components/bookdetails/score/Score";

import * as SecureStore from 'expo-secure-store';
import { AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { Rating } from "react-native-elements";

import { StyleSheet } from "react-native";

const tabs = ["General Info", "Score", "Description"];

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
  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  tabText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },
});

const searchStyles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    marginLeft: 10,
  },icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});

const getIcon = (category) => {
  switch (category) {
    case 'Personal Growth':
      return <FontAwesome5 name="running" size={24} color={COLORS.lightWhite} />;
    case 'Leadership Management':
      return <Ionicons name="people" size={24} color={COLORS.lightWhite} />;
    case 'Creativity':
      return <MaterialCommunityIcons name="drawing-box" size={24} color={COLORS.lightWhite} />;
    case 'Finance Wealth':
      return <MaterialCommunityIcons name="account-cash" size={24} color={COLORS.lightWhite} />;
    case 'Communication Relationships':
      return <MaterialCommunityIcons name="account-heart" size={24} color={COLORS.lightWhite} />;
    case 'Health Wellness':
      return <FontAwesome5 name="apple-alt" size={24} color={COLORS.lightWhite} />;
    case 'Mindfulness':
      return <MaterialCommunityIcons name="meditation" size={24} color={COLORS.lightWhite} />;
    case 'Spirituality':
      return <FontAwesome5 name="peace" size={24} color={COLORS.lightWhite} />;
    default:
      return null;
  }
};

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
            

            <View style={tabStyles.section}>
              <Text style={tabStyles.header}>Authors</Text>
                  <FlatList
                    data={book.authors}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tabStyles.tab}
                        onPress={
                          () => Linking.openURL(`https://www.google.com/search?q=${item}`)
                        }
                      >
                        <Text style={tabStyles.tabText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                  />
            </View>

            

            <View style={tabStyles.section}>
              <Text style={tabStyles.header}>Genres</Text>
                  <FlatList
                    data={book.genre}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={searchStyles.buttonContainer} 
                        onPress={() => {
                          router.push({
                            pathname: `(drawer)/home/all/${item}`,
                            params: {cat: cat, gen: gen}
                          });
                        }}
                      >
                        {getIcon(item)}
                        <Text style={searchStyles.buttonText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                  />
            </View>
                  
            <View style={tabStyles.section}>
              <Text style={tabStyles.header}>Details</Text>
              <Text style={tabStyles.text}>Number of Pages: {book.pageCount === 0 ? "Unknown" : book.pageCount}</Text>
              <Text style={tabStyles.text}>ISBN: {book.isbn13 === "N/A" ? "Unknown" : book.isbn13}</Text>
              <Text style={tabStyles.text}>Publisher/Date: {book.publisher  === "N/A" ? "Unknown" : book.publisher} {book.publishedDate  === "N/A" ? "Unknown" : book.publishedDate}</Text>
            </View>
          </View>
        );

      case "Score":
        return (
          <Score 
            score={Math.ceil(book.score[0])}
          />
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
          headerStyle: { backgroundColor: COLORS.secondary },
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
                ratingsCount={book.ratingsCount}
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
