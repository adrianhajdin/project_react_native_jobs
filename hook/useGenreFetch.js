import { useState, useEffect } from "react";
import axios from "axios";

const useGenreFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const options = {
    method: "GET",
    url: `https://5fkjvn2s62.execute-api.us-east-2.amazonaws.com/default${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log(options.url);
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const performFetch = async () => {
      setIsLoading(true);
      await fetchData();
      setShouldRefetch(false); // Reset refetch state after fetching
    };

    performFetch();
  }, [shouldRefetch]); // Depend only on `shouldRefetch`

  const refetch = () => {
    setShouldRefetch(true);
  };

  return { data, isLoading, error, refetch };
};

export default useGenreFetch;




