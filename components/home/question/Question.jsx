import { useRouter } from "expo-router";
import useFetch from "../../../hook/useFetch";

import SurveyScreen from "./SurveyScreen";

const Question = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/questions", {});
  
  return (
    <SurveyScreen 
      router={router}
      survey={data}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default Question;