import { Redirect, useRouter } from "expo-router";

import { StyleSheet, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Redirect href="/(drawer)/home" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});