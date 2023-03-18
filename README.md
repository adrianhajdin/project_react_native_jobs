# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-react-native-app -t with-router
```

- create the app folder
  - _layout.js
  ``` 
  import { Stack } from "expo-router";

  const Layout = () => {
    return <Stack />;
  };
  ```
  - index.js
  ```
  import React from 'react'
  import { View, Text } from 'react-native'

  const Home = () => {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }
  ``` 

- npm install expo-font axios react-native-dotenv

- run the app

- if the app doesn't run, do npm i -g expo-cli

- expo-cli start --tunnel

- install go app on app store or play store

- scan it from camera or straight from the expo app

## 🌏 Things to Provide

- assets folder: contains font files along with few images 
- constants folder: contains import and some styleguide of the application
- styles folder: contains style for search page
- components folder: complete file folder structure with empty main component file only


## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
- [Request for Comments](https://github.com/expo/router/discussions/1)
- app/_layout.js: Main layout of the application. We are loading custom font here using expo-font
- routes: In each route, you'll see this code:
  ```javascript
  <Stack.Screen
    options={{
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerLeft: () => (
        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
      ),
      headerRight: () => (
        <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
      ),
      headerTitle: "", // you'll see default route name on the screen. Setting the value to empty string will hide it
    }}
  />
  ```
  This is how you customize the headers of each screen natively. We can hide this completely and directly write the code by creating views, touchables but it won't perform well.
 - We are using the map function in the **app/index.js** home screen to display data because the data set is limited (only 10 posts) and has a slightly complex structure. Since we require vertical scrolling, we cannot use both FlatList and ScrollView simultaneously.
   On the other hand, in the **app/search/[id].js** search screen, we are using FlatList since there is nothing else on the screen layout. To enable scrolling without using ScrollView, we have utilized the listHeaderComponent and listFooterComponent properties of FlatList.
 - We can use the StyleSheet module in React Native to update the style of certain elements based on user input such as activeTab or selectedJob. To accomplish this, we can define a style method that returns an object containing the style properties we wish to apply.
   For example:
   ```javascript
   const styles = StyleSheet.create({
      btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
      },
      btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: SIZES.small / 1.25,
      }),
   });
   ```
- We're using externaml package to handel the envs. Install the package
  ```bash
  npm i react-native-dotenv
  ```
  Write keys in .env file
  ```text
  RAPID_API_KEY = <your_api_key>
  ```
  Copy paste the below content in .babelrc file inorder to make it work for ios devices
  ```json
  {
    "plugins": [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  }
  ```
  Start importing the keys
  ```javascript
  import { RAPID_API_KEY } from "@env";
  ```
- To publish app on expo store, you have to install the expo-cli:
  ```bash
  npm i -g expo-cli
  ```
  Then inside the application, run:
  ```bash
  expo publish
  ```
  After successful publishing, you will see the project link at the end. 
