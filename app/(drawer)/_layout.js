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

      const handleDrawerPress = () => {
        console.log("opened")
      };

    return <Drawer screenOptions={{ headerShown: false }}>

        <Drawer.Screen
            name="journey"
            options={{
                drawerLabel: "Journey",
                title: "Journey",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="boat" size={size} color={COLORS.secondary}/>
                },
            }}
        ></Drawer.Screen>


        <Drawer.Screen
            name="home"
            options={{
                drawerLabel: "Explore",
                title: "Explore",
                drawerIcon: ({size, color})=> {
                    return <Ionicons name="md-globe" size={size} color={COLORS.secondary}/> // globe may not exist
                },
                drawerPress: (e) => {
                    e.preventDefault();
                    handleDrawerPress();
                }
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
            name="my-books"
            options={{
                drawerLabel: "My Books",
                title: "My Books",
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