import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

import CircularProgressBar from "../../progressbar/CircularProgressBar";

import styles from "../book/book.style";
import { FONT, SIZES, COLORS } from "../../../constants";

const tabStyles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: COLORS.lightWhite,
    },
    header: {
      fontSize: SIZES.xLarge,
      fontFamily: FONT.bold,
      marginBottom: 10,
      color: COLORS.primary,
    },
    title: {
      fontSize: SIZES.medium,
      fontFamily: FONT.bold,
      marginBottom: 10,
      color: COLORS.primary,
    },
    text: {
      fontSize: SIZES.medium,

      color: COLORS.primary,
    },
    linkText: {
      color: COLORS.primary,
      textDecorationLine: 'underline',
    },
    section: {
      marginVertical: 10,
    },
    progressBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressBarText: {
      marginLeft: 10,
    },
    tab: {
      paddingVertical: SIZES.small / 2,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.medium,
      borderWidth: 1,
      borderColor: COLORS.secondary,
    },
    tabText: {
      fontFamily: FONT.medium,
      color: COLORS.tertiary,
      paddingBottom: 7,
    },
  });

const Score = ({ score }) => {

  const scores = {
    "95-100": "We think you will love this book and find connections like there is no tommorow!", 
    "94-90": "You will find great value in this book, helping you in ways that you never thought possible!", 
    "80-89": "This book is a good fit for you, and will be useful to your self-improvement journey, just maybe not in the way you sense.",
    "70-79": "We belive that this book may be useful to you, but you might find your self struggling to connect or it may be boring.",
    "0-69" : "We don't think that any book out there will not have ANY advice that is not applicable to your life. Give this one a try if you are feeling up to it!"
 }

 const scoreKeys = Object.keys(scores);

 const scoreIdx = (score) => {
    if (score <= 70) {
        return 4;
    } else if (score <= 80) {
        return 3;
    } else if (score <= 90) {
        return 2;
    } else if (score <= 95) {
        return 1;
    } else {
        return 0;
    }
  };
    
  const idx = scoreIdx(score);
  const scoreKey = scoreKeys[idx];
  const scoreText = scores[scoreKey];

  return (
    <View style={{justifyContent: "center", alignItems: "center", padding: 20}}>
      <CircularProgressBar 
        percentage={score}
        size={125}
        big={true}
      />
      <View style={styles.container}>

        <Text style={tabStyles.header}>Score Breakdown</Text>

        <View style={styles.companyInfoBox}>
          <Text style={tabStyles.title}>Score Range: </Text>
          <Text style={tabStyles.tabText}>{scoreKey}</Text>
        </View>

        <View style={tabStyles.section}>
          <Text style={tabStyles.title}>Here's what we think: </Text>
          <Text style={tabStyles.text}>{scoreText}</Text>
        </View>
            
      </View>
    
    </View>
  );
};

export default Score;
