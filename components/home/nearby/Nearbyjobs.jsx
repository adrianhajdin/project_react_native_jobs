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
  
  const { data, isLoading, error } = useFetch("https://5fkjvn2s62.execute-api.us-east-2.amazonaws.com/default/getBooks", {
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
        <Text>This should show books in this category</Text>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text>{item.Title}</Text>
            )}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
