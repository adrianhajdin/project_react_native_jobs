import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native'

const BookIcon = ({book}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={null}>
        <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.image}
        />
        <Text style={styles.text}>{book?.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {

    },
    image: {
      width: 50,
      height: 50,
      margin: 5, // Spacing between the books
    },
  });

export default BookIcon;

