import { SafeAreaView} from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../../constants";
import {ActivityIndicator, Text} from "react-native";
import useFetch from "../../hook/useFetch";
import SurveyScreen from "../../components/home/question/SurveyScreen";

const Questionnare = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/questions", {});

  return ( // change to white once ready
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: COLORS.lightWhite }}> 
      {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <SurveyScreen 
            router={router}
            survey={data}
          />
        )}
    </SafeAreaView>
  );
};

export default Questionnare;
