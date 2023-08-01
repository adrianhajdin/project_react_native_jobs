import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ bookInfo, selectedBook, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedBook, bookInfo)}
      onPress={() => handleCardPress(bookInfo)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedBook, bookInfo)}>
        <Image
          source={{
            uri: checkImageURL(bookInfo?.imageLinks?.thumbnail)
              ? bookInfo?.imageLinks?.thumbnail
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {bookInfo?.volumeInfo?.authors?.[0]}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedBook, bookInfo)} numberOfLines={1}>
          {bookInfo?.volumeInfo?.title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedBook, bookInfo)}>
            {bookInfo?.volumeInfo?.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
