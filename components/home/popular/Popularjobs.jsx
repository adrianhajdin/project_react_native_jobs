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

const Popularjobs = ({ cat, gen }) => {
  console.log(cat);
  console.log(gen);
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/getBooks/top", {
    cat: cat,
    gen: gen,
  });

  const [selectedBook, setSelectedBook] = useState();

  const handleCardPress = (book) => {
    router.push({
      pathname: `(drawer)/home/book-details/${book.id}`,
      params: {cat: cat, gen: gen}
    });
    setSelectedBook(book.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Picks For You</Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "(drawer)/home/all/top",
              params: {cat: cat, gen: gen}
            });
        }}
        >
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
            data={data.slice(0,10)}
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
