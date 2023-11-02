import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Path1 from './Path1';  

const { width, height } = Dimensions.get('window');

const Journey1 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.pathContainer}>
                <Path1 />
            </View>
            <View style={styles.booksContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.book} />
                <Image source={require('../../assets/images/logo.png')} style={styles.book} />
                <Image source={require('../../assets/images/logo.png')} style={styles.book} />
                {/* Add as many books as needed */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // makes sure your container takes all available space
        flexDirection: 'row',
        alignItems: 'center', // vertically centered
        justifyContent: 'center', // horizontally centered
        width: width, // full width of the screen
        height: height * 0.3, // adapt the height to be a fraction of the screen height
    },
    pathContainer: {
        flex: 0.5, // takes up 50% of the space
    },
    booksContainer: {
        flex: 0.5, // takes up 50% of the space
        flexDirection: 'row', // to align books horizontally
        justifyContent: 'center', // center the content horizontally
        alignItems: 'center', // center the items vertically
        flexWrap: 'wrap', // if you have many books, this will allow them to wrap to the next line
    },
    book: {
        width: 50,
        height: 50,
        margin: 5, // Spacing between the books
    },
});

export default Journey1;
