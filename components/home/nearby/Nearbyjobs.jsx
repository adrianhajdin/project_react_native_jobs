import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import DropdownComponent from "./Dropdown";


const Nearbyjobs = () => {

  const router = useRouter();
  const [endpoint, setEndpoint] = useState("/getBooks/category/Personal Growth")

  const handleGenreChange = (genre) => {
    console.log(`called! ${genre}`);
    setEndpoint(`/getBooks/category/${genre}`);
    refetch();
  };

  const { data, isLoading, error, refetch } = useFetch(endpoint, {
    cat: '342341554232322443332222',
    gen: '111',
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
              handleNavigate={() => router.push(`(drawer)/home/book-details/${book.id}`)}
            />
          ))
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
            <Text style={styles.footerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default Nearbyjobs;
