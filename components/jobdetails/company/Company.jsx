import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { icons } from "../../../constants";
import { checkImageURL } from "../../../utils";

const Book = ({ score, bookLogo, title, subtitle, authors, rating, description, genre, pageCount, isbn, publisher, publishedDate, country }) => {
  return (
    <View style={styles.container}>
      <Text>{score}</Text>
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
        <Text style={styles.companyName}>{subtitle} / </Text>
        
      </View>
      <Text>Authors: {authors}</Text>
      <Text numberOfLines={3}>Description: {description}</Text>
      <Text>Genres: {genre}</Text>
      <Text>Rating: {rating}</Text>

      <Text>pageCount: {pageCount}</Text>
      <Text>ISBN: {isbn}</Text>
      <Text>Publisher/Date: {publisher} {publishedDate}</Text>
      <Text>Country: {country}</Text>
    </View>
  );
};

export default Book;
