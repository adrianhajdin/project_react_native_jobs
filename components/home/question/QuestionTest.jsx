import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "../popular/popularjobs.style";
import { COLORS, SIZES } from "../../../constants"
import useFetch from "../../../hook/useFetch";

import SurveyScreen from "./SurveyScreen";
import { useRouter } from "expo-router";

const QuestionTest = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch("/questions", {});
    
    const reformatQuestion = (question) => {
        return {
            questionType: 'SelectionGroup',
            questionText: question.Question,
            questionId: question.Topic,
            questionSettings: {
                allowDeselect: false,
            },
            options: [
                {
                    optionText: question.Ratings[0],
                    value: '1'
                },
                {
                    optionText: question.Ratings[1],
                    value: '2'
                },
                {
                    optionText: question.Ratings[2],
                    value: '3'
                },
                {
                    optionText: question.Ratings[3],
                    value: '4'
                },
                {
                    optionText: question.Ratings[4],
                    value: '5'
                }

            ]
        }
      };
  
  return (
    <View style={styles.cardsContainer}>
        {error ? (
          <Text>Something went wrong</Text>
        ) : (
          <SurveyScreen 
            router={router}
            survey = {data.map(reformatQuestion) ?? {
              questionType: 'Info',
              questionText: 'Loading'
          }}
            isLoading = {isLoading}
          />
        )}
      </View>
  )
}

export default QuestionTest;