import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONT, COLORS } from '../../../constants';

const Header = ({ topic }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{topic}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontFamily: FONT.bold,  // Replace this with the actual font family you're using
    fontSize: SIZES.medium, // Replace this with the actual size you're using
  },
});

export default Header;
