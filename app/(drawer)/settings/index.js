import { Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function SettingsPage() {
  return (
    <View>
      <Drawer.Screen options={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton />,
      }}
      />
      <Text>Settings Page for drawer</Text>
    </View>
  );
}