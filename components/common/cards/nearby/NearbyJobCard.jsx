import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";
import CircularProgressBar from "../../../progressbar/CircularProgressBar";

const NearbyJobCard = ({ book, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(book.thumbnail)
              ? book.thumbnail
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={2}>
          {book.title}
        </Text>
      </View>
      <CircularProgressBar 
        percentage={Math.ceil(book.score[0])}
      />
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
