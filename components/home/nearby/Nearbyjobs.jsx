import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import { FlatList } from "react-native-gesture-handler";
import DropdownComponent from "./Dropdown";


const Nearbyjobs = () => {
  const genre = "Leadership Management"
  const router = useRouter();
  const { data, isLoading, error } = useFetch(`/getBooks/category/${genre}`, {
    cat: '342341554232322443332222',
    gen: '111',
  });

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular in Personal Growth</Text>  
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      {/* <DropdownComponent /> */}
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          data?.map((book) => (
            <NearbyJobCard
              book={book}
              key={book.id}
              handleNavigate={() => router.push(`/book-details/${book.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
