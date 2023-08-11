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

const QuestionTest = () => {
    const { data, isLoading, error } = useFetch("https://5fkjvn2s62.execute-api.us-east-2.amazonaws.com/default/questions");
    
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
      const newSurvey = data.map(reformatQuestion)


  return (
    <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <SurveyScreen 
            survey={newSurvey}
          />
        )}
      </View>
  )
}

export default QuestionTest;