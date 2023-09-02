import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url, id, favorite, handleBtnPress}) => { // if favorite is true, then we know we have to go the other way
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn(favorite)} onPress={() => handleBtnPress(id, favorite)}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage(favorite)}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={
          () => Linking.openURL(url)}

      >
        <Text style={styles.applyBtnText}>Buy this book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
