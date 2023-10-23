import * as React from "react"
import Svg, {Path} from "react-native-svg"
import { View, StyleSheet} from "react-native";

const RightLeft = (props) => (
  <View style={styles.container}>
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 920 300"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeWidth={20}
      d="M910 300C910-99.623 10 494.151 10 0"
    />
  </Svg>
  </View>
)

const styles = StyleSheet.create({
  container: {
      flex: 1, // to ensure it takes up all available space within its parent container
      padding: 0, // or however much padding you prefer
      // Other styling options as needed
  },
});

export default RightLeft
