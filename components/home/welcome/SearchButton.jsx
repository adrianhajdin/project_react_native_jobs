import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons from @expo/vector-icons
import { COLORS, FONT, SIZES } from '../../../constants';

const SearchButton = ({ onPress, searchText}) => {
  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Ionicons name="search" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>{searchText ?? "Search for your next life-changing book"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    borderRadius: 25, // Rounded corners to make it pill-shaped
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: 'white',
    fontSize: SIZES.medium,
    fontFamily: FONT.regular
  },icon: {
    marginRight: 10, // Add some margin to the right of the icon
  },
});

export default SearchButton;
