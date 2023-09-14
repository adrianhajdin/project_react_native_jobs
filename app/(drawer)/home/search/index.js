import React, {useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView , ActivityIndicator, Platform, TouchableOpacity} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import useFetch from "../../../../hook/useFetch";
import { Stack, useRouter, useSearchParams, useLocalSearchParams } from 'expo-router'

import NearbyJobCard from "../../../../components/common/cards/nearby/NearbyJobCard";
import { COLORS, icons, SIZES } from '../../../../constants'
import styles from '../../../../styles/search'

import { Ionicons } from '@expo/vector-icons'; 


const Search = () => {

	const quesParams = useLocalSearchParams();
    const { cat, gen } = quesParams;

	const router = useRouter();
	const [searchData, setSearchData] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const { data, isLoading, error } = useFetch("/getBooks", {
		cat: cat,
		gen: gen,
	});

	useEffect(() => {
        setSearchData(data);
    }, [data]);

	const searchFilterFunction = (text) => {
		// Check if searched text is not blank
		if (text) {
		  // Inserted text is not blank
		  // Filter the masterDataSource
		  // Update FilteredDataSource
		  const newData = data.filter(function (item) {
			const itemData = item.title
			  ? item.title.toUpperCase()
			  : ''.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		  });
		  setSearchData(newData);
		  setSearchValue(text);
		} else {
		  // Inserted text is blank
		  setSearchData(data);
		  setSearchValue(text);
		}
	  };

	  const renderHeader = () => {
        return (
            <>
                <View style={styles.container}>
                    <Text style={styles.searchTitle}>Search Books</Text>
                    <Text style={styles.noOfSearchedJobs}>All Categories</Text>
                </View>
                <View style={styles.loaderContainer}>
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error && (
                        <Text>Oops something went wrong</Text>
                    )}
                </View>
            </>
        );
    };

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
		<Stack.Screen
			options={{
				headerStyle: { backgroundColor: COLORS.secondary },
				headerShadowVisible: false,
				headerLeft: () => (
					<TouchableOpacity
						onPress={() => router.back()}
					><Ionicons name="arrow-back" size={24} color={COLORS.lightWhite} style={{padding: 10}} />
					</TouchableOpacity>
				),
				headerTitle: "",
			}}
		/>
		<View style={{padding: 10}}>
		<SearchBar
			round
			lightTheme
			platform={Platform.OS}
			searchIcon={{ size: 24 }}
			onChangeText={(text) => searchFilterFunction(text)}
			onClear={(text) => searchFilterFunction('')}
			placeholder="Type Here..."
			value={searchValue}
		/>
		</View>
		<FlatList
			data={searchData}
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
			ListHeaderComponent={renderHeader}
		/>
	</SafeAreaView>
	);
}

export default Search;
