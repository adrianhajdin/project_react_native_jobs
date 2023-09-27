import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";

import styles from "../../home/nearby/nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useGenreFetch from "../../../hook/useGenreFetch";
import useFetch from "../../../hook/useFetch";


const SimilarBooks = ( { cat, gen, book_id} ) => {

  const router = useRouter();

  const { data, isLoading, error} = useFetch(`/getBooks/similar/${book_id}`, {
    cat: cat,
    gen: gen,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Similar Books</Text>  
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          data.slice(1,10)?.map((book) => (
            <NearbyJobCard
              book={book}
              key={book.id}
              handleNavigate={() => router.push({
                pathname: `(drawer)/home/book-details/${book.id}`,
                params: {cat: cat, gen: gen}
            })}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default SimilarBooks;
