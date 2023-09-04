import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter, useSearchParams, useLocalSearchParams } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import axios from 'axios';
import useFetch from '../../../../hook/useFetch';

import { ScreenHeaderBtn, NearbyJobCard } from '../../../../components';
import { COLORS, icons, SIZES } from '../../../../constants';
import styles from '../../../../styles/search';

import { Ionicons } from '@expo/vector-icons';

const AllBooks = () => {
    const params = useSearchParams();
    const router = useRouter()

    const quesParams = useLocalSearchParams();
    const { cat, gen } = quesParams;

    const { data, isLoading, error } = useFetch(`/getBooks/${params.id === "top" ? "top" : `category/${params.id}`}`, {
        cat: cat,
        gen: gen,
      });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.secondary},
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
                            <Text style={styles.searchTitle}>{params.id}</Text>
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
                // ListFooterComponent={() => (
                //     <View style={styles.footerContainer}>
                //         <TouchableOpacity
                //             style={styles.paginationButton}
                //             onPress={() => handlePagination('left')}
                //         >
                //             <Image
                //                 source={icons.chevronLeft}
                //                 style={styles.paginationImage}
                //                 resizeMode="contain"
                //             />
                //         </TouchableOpacity>
                //         <View style={styles.paginationTextBox}>
                //             <Text style={styles.paginationText}>1</Text>
                //         </View>
                //         <TouchableOpacity
                //             style={styles.paginationButton}
                //             onPress={() => handlePagination('right')}
                //         >
                //             <Image
                //                 source={icons.chevronRight}
                //                 style={styles.paginationImage}
                //                 resizeMode="contain"
                //             />
                //         </TouchableOpacity>
                //     </View>
                // )}
            />
        </SafeAreaView>
    )
}

export default AllBooks;