import LeftRight from "./LeftRight";
import RightLeft from "./RightLeft";
import { View, StyleSheet, Dimensions, Image, ImageBackground, ActivityIndicator, Text } from "react-native";
import BookIcon from "./bookicon/BookIcon";
import { useEffect, useState} from "react";

import { Heading } from "@gluestack-ui/themed"

import { COLORS } from "../../constants";

import { fetchLocalData } from "../../hook/storageHelpers";

import useFetch from "../../hook/useFetch";

const { width, height } = Dimensions.get("window");

const Journey = () => {

  return (
    <ImageBackground
        source={require("../../assets/images/path.jpeg")}
        imageStyle={{ borderRadius: 20, opacity: 0.75}}
        style={{flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center'}}
    >
      <View style={styles.container}>
        <View style={[styles.booksContainer, styles.alignLeft]}>
          <BookIcon imgUri={"http://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"}/>
          <Heading size="lg" color={COLORS.primary} >{"  The Alchemist"}</Heading></View>
        <View style={styles.pathContainer}><RightLeft /></View>
        
        <View style={[styles.booksContainer, styles.alignRight]}>
          <BookIcon imgUri={"http://books.google.com/books/content?id=RWG13F93aKsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"}/>
          <Heading size="lg" color={COLORS.primary} >{"The Monk Who Sold His Ferrari"}</Heading>
        </View>
        <View style={styles.pathContainer}><LeftRight /></View>
        
        <View style={[styles.booksContainer, styles.alignLeft]}><BookIcon imgUri={"https://books.google.com/books/content?id=yng_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api%22,%20%22thumbnail%22:%20%22http://books.google.com/books/content?id=yng_CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"}/><Heading size="lg" color={COLORS.primary} >{"The Subtle Art of Not Giving a F*ck"}</Heading></View>
        <View style={styles.pathContainer}><RightLeft /></View>
        
        <View style={[styles.booksContainer, styles.alignRight]}><Heading size="lg" color={COLORS.primary} >{"Atomic Habits  "}</Heading><BookIcon imgUri={"http://books.google.com/books/content?id=lFhbDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"}/></View>

    </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // makes sure your container takes all available space
    flexDirection: "column", // stack children vertically
    alignItems: "stretch", // stretch to the full width of the container
    width: width, // full width of the screen
    height: height, // full height of the screen
  },
  pathContainer: {
    height: 100,
  },
  booksContainer: {
    flexDirection: "row", // to align books horizontally
    justifyContent: "flex-start", // initially align content to the start (left)
    alignItems: "center", // center the items vertically
    padding: 10, // Some space around the books container
    flexWrap: "wrap", // if you have many books, this will allow them to wrap to the next line
  },
  alignRight: {
    justifyContent: "flex-end", // aligns content to the right
    marginRight: 20
  },
  alignLeft: {
    justifyContent: "flex-start", // aligns content to the left (start)
  },
  book: {
    width: 50,
    height: 50,
    margin: 5, // Spacing between the books
  },
});

export default Journey;
