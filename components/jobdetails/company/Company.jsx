import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
import Stars from "./Stars";
import { useRouter } from "expo-router";
import CircularProgressBar from "../../progressbar/CircularProgressBar";
import Tabs from "./Tabs";

const router = useRouter();

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
                  uri: checkImageURL(bookLogo)
                    ? bookLogo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                style={styles.logoImage}
              />
            </View>

            <View style={styles.jobTitleBox}>
              <Text style={styles.jobTitle}>{title}</Text>
            </View>

            <View style={styles.companyInfoBox}>
              <Text style={styles.companyName}>{subtitle}</Text>
            </View>
            <Text>Authors: {authors}</Text>
            <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('https://www.google.com/search?q=${authors[0]}')}>
            Click here to learn more about the author!
            </Text>
            <Text>Genres: {genre}</Text>
            <Text>pageCount: {pageCount}</Text>
            <Text>ISBN: {isbn}</Text>
            <Text>Publisher/Date: {publisher} {publishedDate}</Text>
            <Text>Country: {country}</Text>
          </View>
        );

      case "Ratings/Reviews":
        return (
          <View style={styles.container}>
            <Text>Rating: {rating}</Text>
            <Stars />
          </View>
        );

      case "Description":
        return (
          <Text>Description: {description}</Text>
        );

      default:
        return null;
    }
  };


const Book = ({ score, bookLogo, title, subtitle, authors, rating, description, genre, pageCount, isbn, publisher, publishedDate, country }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>

              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Book;
