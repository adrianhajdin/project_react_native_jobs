import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const title = "Atomic Habits";
  const { data, isLoading, error } = useFetch("https://www.googleapis.com/books/v1/volumes", {
    q: `intitle = ${title}`,
    maxResults: 3,
    key: 'AIzaSyDVnwYDP7eKPccg80tmjrzubotTLmiPDDU',
  });

  const [selectedBook, setSelectedBook] = useState();

  const handleCardPress = (book) => {
    router.push(`/book-details/${book.volumeInfo.title}`);
    setSelectedBook(book.volumeInfo.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Picks</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                book={item}
                selectedBook={selectedBook}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={book => book.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
