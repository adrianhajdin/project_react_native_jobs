import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React, { useCallback } from "react";

import styles from "./footer.style";
import { icons, COLORS } from "../../../constants";

const Footer = ({ url, id, favorite, onFavoritePress}) => { // if favorite is true, then we know we have to go the other way
  
  const handleFavoritePress = useCallback(() => {
    onFavoritePress(id, favorite); // toggle favorite status here
  }, [id, favorite, onFavoritePress]); // added onFavoritePress to dependency array
  // Move dynamic styling inside the component
  const likeBtnStyle = {
    ...styles.likeBtn,
    backgroundColor: favorite ? COLORS.tertiary : COLORS.lightWhite
  };

  const likeBtnImageStyle = {
    ...styles.likeBtnImage,
    tintColor: favorite ? COLORS.lightWhite : COLORS.tertiary
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={likeBtnStyle} onPress={handleFavoritePress}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={likeBtnImageStyle}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={
          () => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>View this book on Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
