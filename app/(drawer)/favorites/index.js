import { Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { COLORS, icons, images, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import styles from "../../../styles/search";
import { useRouter } from "expo-router";
import { NearbyJobCard } from "../../../components";
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons

export default function FavoritesPage() {

  const router = useRouter();

  // BOTH these handled at book details? (SAVE)
  //method to save each new book to favorites
  // as well as method to clean up favorites

  // handle UI with both of these methods

  // Method 1
  // onPress --> call save function (if it is the add, just add)
  //Method 2 
  // onpress --> call delte function, removing it and reuploading the value. If not in item, then just do nothing 

  //LOAD
  // need to load from "favorites"
  // unpack values, splitting by " "
  // call API to get all data
  // filter through data to only display APIs needed (similar to seacrch fucntion, set new variable?)






  const { data, isLoading, error } = useFetch("/getBooks/top", {
    cat: "34234155423232244333",
    gen: "111",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen options={{
        headerStyle: { backgroundColor: COLORS.tertiary },
        headerShadowVisible: false,
        headerLeft: () => (
          <DrawerToggleButton 
            tintColor={COLORS.lightWhite}
          />
        ),
        title: "",
      }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <FlatList
              data={data}
              renderItem={({ item }) => (
                    <NearbyJobCard
                        book={item}
                        handleNavigate={() => router.push({
                            pathname: `(drawer)/home/book-details/${item.id}`,
                            params: {cat: cat, gen: gen}
                        })}
                    />
                )}
                keyExtractor={(book) => book.id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Ionicons name="heart" size={50} color={COLORS.primary} style={styles.icon} />
                            <Text style={styles.searchTitle}>Favorites</Text>
                            <Text style={styles.noOfSearchedJobs}>All Books</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : error && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}