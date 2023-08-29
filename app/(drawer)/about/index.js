import { Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function AboutPage() {
  return (
    <View>
      <Drawer.Screen options={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton />,
      }}
      />
      <Text>About Page for drawer</Text>
    </View>
  );
}