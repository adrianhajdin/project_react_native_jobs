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


const infoSurvey = [
  {
      questionType: 'Info',
      questionText: 'Welcome to ReadAI!'
  },
  {
      questionType: 'Info',
      questionText: 'We will be asking you some personal questions in order to tailor our selection of books.'
  },
  {
      questionType: 'TextInput',
      questionText: 'Firstly, could you please provide us with your name?',
      questionId: 'name',
      placeholderText: 'Enter your name here',
  },
  {
      questionType: 'Info',
      questionText: 'Next, we will be asking you about Personal Growth.'
  },
  {
      questionType: 'Info',
      questionText: 'Following that, let\'s explore Leadership/Management.'
  },
  {
      questionType: 'Info',
      questionText: 'Subsequently, we\'d like to know about your interests in Creativity.'
  },
  {
      questionType: 'Info',
      questionText: 'Moreover, we\'ll inquire about Finance/Wealth.'
  },
  {
      questionType: 'Info',
      questionText: 'Additionally, we\'ll discuss Communication/Relationships.'
  },
  {
      questionType: 'Info',
      questionText: 'Afterwards, we\'ll move on to Health/Wellness.'
  },
  {
      questionType: 'Info',
      questionText: 'Subsequently, we\'ll ask about Mindfulness.'
  },
  {
      questionType: 'Info',
      questionText: 'Furthermore, let\'s delve into Spirituality.'
  },
  {
      questionType: 'Info',
      questionText: 'Lastly, we will discuss the General category.'
  },
  {
      questionType: 'Info',
      questionText: 'Thank you for your valuable time. Your responses will help us tailor our selection of books for you!'
  },
];


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
    
    const dataSurvey = data.map(reformatQuestion);
  

    let combinedSurvey = [];
      let start = infoSurvey.slice(0, 3);
      combinedSurvey.push(...start);
      for (let i = 0; i < 9; i++) {
          combinedSurvey.push(infoSurvey[i + 3])
          for (let j = 0; j < 3; j++) {
            combinedSurvey.push(dataSurvey[3*i + j])
          }
      }
      combinedSurvey.push(infoSurvey[infoSurvey.length - 1])

  return (
    <View style={styles.cardsContainer}>
        {error ? (
          <Text>Something went wrong</Text>
        ) : (
          <SurveyScreen 
            router={router}
            survey = {combinedSurvey ?? {
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