import {React, useCallback} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONT, COLORS } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const colors = ['grey', 'blue', 'green']

const AlreadyReadHeader = ({id, bookState, text, handleBtnPress}) => {

  const handleHeaderPress = useCallback(() => {
    handleBtnPress(id, bookState); // toggle favorite status here
  }, [id, bookState, text, handleBtnPress]); // added onFavoritePress to dependency array
  return (
      <TouchableOpacity 
        style={styles.container(bookState)}
        onPress={handleHeaderPress}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (bookState) => ({
    height: 60,
    backgroundColor: colors[bookState],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  }),
  text: {
    color: 'white',
    fontFamily: FONT.bold,  // Replace this with the actual font family you're using
    fontSize: SIZES.medium, // Replace this with the actual size you're using
  },
});

export default AlreadyReadHeader;
