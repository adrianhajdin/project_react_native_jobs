import React from "react";
import { View, Text, Image, BackHandler } from "react-native";

import styles from "./book.style";
import { COLORS, icons } from "../../../constants";
import { checkImageURL } from "../../../utils";
import StarRating from "react-native-star-rating";



const Book = ({ score, bookLogo, title, subtitle, authors, rating, ratingsCount, description, genre, pageCount, isbn, publisher, publishedDate, country }) => { // chnage to only show title or whatever you think looks good (remove unused props)
  return (
    <View style={styles.container}>
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
    <Text style={styles.companyName}>{subtitle === "N/A" ? "" : subtitle}</Text>
    <View style={styles.companyInfoBox}>
    <Text style={styles.companyName}>Rating: </Text>
    <StarRating
      disabled={true} // Setting this to true makes it read-only
      maxStars={5}
      rating={rating} // Initial rating of 3.5 stars
      halfStarEnabled={true} // Enables half-star functionality
      emptyStar={rating === "N/A" ? "" : 'star-outline'} // Name of the empty star icon
      fullStar={'star'} // Name of the full star icon
      halfStar={'star-half-full'} // Name of the half star icon
      iconSet={'MaterialCommunityIcons'} // Set the icon library
      emptyStarColor={COLORS.tertiary} // Color of empty stars
      fullStarColor={COLORS.tertiary} // Color of full or half-full stars
      starSize={20}
    />
    <Text style={styles.companyName}>{rating === "N/A" ? "Unknown" : ` (${ratingsCount})`}</Text>
    </View>

    

    </View>
  );
};

export default Book;
