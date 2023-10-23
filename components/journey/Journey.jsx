import LeftRight from "./LeftRight";
import RightLeft from "./RightLeft";
import { View, StyleSheet, Dimensions, Image, ImageBackground, ActivityIndicator, Text } from "react-native";
import BookIcon from "./bookicon/BookIcon";
import logo from "../../assets/images/path.jpeg"
import { useEffect, useState} from "react";

import { COLORS } from "../../constants";

import { fetchLocalData } from "../../hook/storageHelpers";

import useFetch from "../../hook/useFetch";

const { width, height } = Dimensions.get("window");

const Journey = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    const [cat, setCat] = useState("");
    const [gen, setGen] = useState("");
    const [uuidv4, setUuidv4] = useState("");

    const fetchUuidv4 = async () => {
        if (uuidv4 == "") {
            fetchLocalData("uuidv4")
            .then((localUuidv4) => {
                setUuidv4(localUuidv4);
                return localUuidv4
            })
        } else {
            return uuidv4
        }
        }

        const loadData = async () => {
        fetchUuidv4()
        .then((uuidv4) => {
            fetchLocalData(uuidv4)
            .then((data) => {
                setCat(data.cat);
                setGen(data.gen);
            })
        })
        };

        useEffect(() => {
        loadData()
        .then(() => {
            console.log("Data initially loaded.")
        })
        }, []);


        const { data, apiIsLoading, error } = useFetch("/getBooks/journey", {
        cat: "111111111111111111111111", // cat here
        gen: "111", // gen here
        });
        
        useEffect(() => {
        setIsLoading(apiIsLoading);
        setBooks(data);
        }, [apiIsLoading]);

  return (
    <View>
    {isLoading ? (
        <ActivityIndicator size='large' color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
    <ImageBackground
        source={logo}
    >
    <View style={styles.container}>
        {/* May have to change this data[...] */}
        <View style={[styles.booksContainer, styles.alignLeft]}><BookIcon book={data[2]} /></View>
        <View style={styles.pathContainer}><RightLeft /></View>

        <View style={[styles.booksContainer, styles.alignRight]}><BookIcon book={data[1]}/></View>
        <View style={styles.pathContainer}><LeftRight /></View>

        <View style={[styles.booksContainer, styles.alignLeft]}><BookIcon book={data[0]}/></View>
        <View style={styles.pathContainer}><RightLeft /></View>

    </View>
    </ImageBackground>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // makes sure your container takes all available space
    flexDirection: "column", // stack children vertically
    alignItems: "stretch", // stretch to the full width of the container
    width: width, // full width of the screen
    height: height, // full height of the screen
  },
  pathContainer: {
    height: 100,
  },
  booksContainer: {
    flexDirection: "row", // to align books horizontally
    justifyContent: "flex-start", // initially align content to the start (left)
    alignItems: "center", // center the items vertically
    padding: 10, // Some space around the books container
    flexWrap: "wrap", // if you have many books, this will allow them to wrap to the next line
  },
  alignRight: {
    justifyContent: "flex-end", // aligns content to the right
  },
  alignLeft: {
    justifyContent: "flex-start", // aligns content to the left (start)
  },
  book: {
    width: 50,
    height: 50,
    margin: 5, // Spacing between the books
  },
});

export default Journey;
