import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ book, selectedBook, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedBook, book)}
      onPress={() => handleCardPress(book)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedBook, book)}>
        <Image
          source={{
            uri: checkImageURL(book?.volumeInfo?.imageLinks?.thumbnail)
              ? book?.volumeInfo?.imageLinks?.thumbnail
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {book?.volumeInfo?.authors?.[0]}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedBook, book)} numberOfLines={3}>
          {book?.volumeInfo?.title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedBook, book)}>
            {book?.volumeInfo?.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
