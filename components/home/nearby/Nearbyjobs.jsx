import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import DropdownComponent from "./Dropdown";
import useGenreFetch from "../../../hook/useGenreFetch";


const Nearbyjobs = ( { cat, gen} ) => {

  const router = useRouter();
  const [genre, setGenre] = useState("Personal Growth")

  const handleGenreChange = (genre) => { // need to fix to call current endpoint, use params?
    setGenre(genre);
    refetch();
  };

  const { data, isLoading, error, refetch} = useGenreFetch(`/getBooks/category/${genre}`, {
    cat: cat,
    gen: gen,
  });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular in</Text>  
        <DropdownComponent 
          handleGenreChange={handleGenreChange}
        />
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          data.slice(0,10)?.map((book) => (
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
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `(drawer)/home/all/${genre}`, // where else did this call get made
              params: {cat: cat, gen: gen}
            });
          }}
        >
            <Text style={styles.footerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Nearbyjobs;
