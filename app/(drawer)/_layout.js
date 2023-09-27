import { Drawer } from 'expo-router/drawer';
import {Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { COLORS } from '../../constants';


export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "/(drawer)/home",
  };

export default function Layout() {

    const [fontsLoaded] = useFonts({
        DMBold: require("../../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../../assets/fonts/DMSans-Regular.ttf"),
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen
            name="home"
            options={{
                drawerLabel: "Home",
                title: "Home",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="md-home" size={size} color={COLORS.secondary}/>
                },
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="favorites"
            options={{
                drawerLabel: "Favorites",
                title: "Favorites",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="md-heart" size={size} color={COLORS.secondary}/>
                },
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="books-read"
            options={{
                drawerLabel: "Books Read",
                title: "Books Read",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="book" size={size} color={COLORS.secondary}/>
                },
            }}
        ></Drawer.Screen>

        <Drawer.Screen
            name="about"
            options={{
                drawerLabel: "About Us",
                title: "About Us",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="md-people" size={size} color={COLORS.secondary}/>
                },
            }}
        ></Drawer.Screen>

        


    </Drawer>;
}