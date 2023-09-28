import {React, useCallback} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SIZES, FONT, COLORS } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AlreadyReadHeader = ({ id, read, handleBtnPress }) => {

  const onPressAlreadyRead = useCallback(() => handleBtnPress(id, read), [id, read]);

  return (
      <TouchableOpacity 
        style={styles.container(read)}
        onPress={onPressAlreadyRead}
      >
        <Text style={styles.text}>{read ? "Already Read!" : "Haven't Read Yet"}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (read) => ({
    height: 60,
    backgroundColor: read ? 'green' : 'gray',
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
