import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";


const Question = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch('question');
  
    const [selectedBook, setSelectedBook] = useState();
  
    const handleCardPress = (book) => {
      router.push(`/book-details/${book.volumeInfo.title}`);
      setSelectedBook(book.volumeInfo.title);
    };

  return (
    <View style={styles.cardsContainer}>
    {isLoading ? (
      <ActivityIndicator size='large' color={COLORS.primary} />
    ) : error ? (
      <Text>Something went wrong</Text>
    ) : (
      <FlatList
        data={data}
        ListHeaderComponent={
            <QuestionHeader
                genre={question.genre}
                selectedQuestion={question.id}

            />
        }
        renderItem={({ item }) => (
            <View>
            <Text>question.category</Text>
            <QuestionBody
                question={item}
                selectedQuestion={selectedBook}
                handleCardPress={handleCardPress}
            />
          </View>
        )}
        keyExtractor={book => book.id}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        horizontal
        ListFooterComponent={
            <QuestionFooter
                selectedQuestion={question.id}
                backPressFunc={backPressFunc()}
                forwardPressFunc={backPressFunc()}
            />
        }
        
      />
    )}
  </View>
  )
}

export default Question