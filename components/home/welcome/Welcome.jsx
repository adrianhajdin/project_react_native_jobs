import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

import SearchButton from "./SearchButton";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const genres = ['Personal Growth', 'Leadership/Management', 'Creativity', 'Finance/Wealth', 'Communication/Relationships',
'Health/Wellness', 'Mindfulness', 'Spirituality'];

const Welcome = ({ handleClick, cat, gen, name}) => {
  const router = useRouter();
  const [genre, setGenre] = useState("Personal Growth");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {name}</Text>
        <Text style={styles.welcomeMessage}>Find your perfect book</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchButton />
        {/* <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Text>Search for your book...WIP</Text>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={genres}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(genre, item)}
              onPress={() => {
                setGenre(item);
                router.push({
                  pathname: `(drawer)/home/all/${item.replace(/\//g, " ")}`,
                  params: {cat: cat, gen: gen}
                });
              }}
            >
              <Text style={styles.tabText(genre, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
