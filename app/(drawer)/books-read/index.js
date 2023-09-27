import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONT, SIZES } from '../../../constants';


// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const BooksReadPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Drawer.Screen options={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerShadowVisible: false,
        headerLeft: () => (
          <DrawerToggleButton 
            tintColor={COLORS.lightWhite}
          />
        ),
        title: "",
      }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
      <Text>Books Read</Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default BooksReadPage;