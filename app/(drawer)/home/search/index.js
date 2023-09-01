import React, {useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView , ActivityIndicator, Platform} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import useFetch from "../../../../hook/useFetch";
import { Stack, useRouter, useSearchParams, useLocalSearchParams } from 'expo-router'

import { ScreenHeaderBtn, NearbyJobCard } from '../../../../components'
import { COLORS, icons, SIZES } from '../../../../constants'
import styles from '../../../../styles/search'


const Search = () => {

	const quesParams = useLocalSearchParams();
    const { cat, gen } = quesParams;

	const router = useRouter();

	const { data, isLoading, error } = useFetch("/getBooks", {
		cat: cat,
		gen: gen,
	});

	const [searchData, setSearchData] = useState(data);
	const [searchValue, setSearchValue] = useState("");

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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
		<Stack.Screen
			options={{
				headerStyle: { backgroundColor: COLORS.lightWhite },
				headerShadowVisible: false,
				headerLeft: () => (
					<ScreenHeaderBtn
						iconUrl={icons.left}
						dimension='60%'
						handlePress={() => router.back()}
					/>
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
			ListHeaderComponent={() => (
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
			)}
		/>
	</SafeAreaView>
	);
}

export default Search;
