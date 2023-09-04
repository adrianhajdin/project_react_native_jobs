import React from 'react';
import { Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity, SafeAreaView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONT } from '../../../constants';


// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const AboutPage = () => {
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
      <Text style={styles.title}>About Us</Text>

      {/* <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={require('../../../assets/images/splash.png')}
        style={styles.logo}
      /> */}

      <View style={styles.section}>
        <Text style={styles.subtitle}>Who We Are</Text>
        <Text style={styles.text}>
          We are Om Rajpal and Ashok Saravanan, the co-founders of Read-AI. We are passionate about personal growth and lifelong learning.
        </Text>
      </View>

      {/* Om Rajpal Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Om Rajpal</Text>
        <View style={styles.profileContainer}>
          <Avatar
            rounded
            size="large"
            source={require('../../../assets/images/splash.png')}
          />
          <Text style={styles.text}>
            Om is a software engineer with a love for technology and books. His passion for personal development led him to the idea of Read-AI.
          </Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/omrajpal/')}>
            {/* <AnimatedIcon name='linkedin' type='font-awesome' color='#0077B5' animation="bounceIn" delay={500} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/OmRajpal')}>
            {/* <AnimatedIcon name='twitter' type='font-awesome' color='#1DA1F2' animation="bounceIn" delay={700} /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Ashok Saravanan Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Ashok Saravanan</Text>
        <View style={styles.profileContainer}>
          <Avatar
            rounded
            size="large"
            source={require('../../../assets/images/splash.png')}
          />
          <Text style={styles.text}>
            Ashok is an avid reader and a data scientist. He believes that everyone can achieve greater heights through self-learning and continuous improvement.
          </Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/ashok-saravanan/')}>
            {/* <AnimatedIcon name='linkedin' type='font-awesome' color='#0077B5' animation="bounceIn" delay={500} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/AshokSaravanan')}>
            {/* <AnimatedIcon name='twitter' type='font-awesome' color='#1DA1F2' animation="bounceIn" delay={700} /> */}
          </TouchableOpacity>
        </View>
      </View>

      {/* Why Read-AI Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Why Read-AI?</Text>
        <Text style={styles.text}>
          We started Read-AI to help people discover books for personal growth in a truly personalized manner.
        </Text>
      </View>

      {/* Contact Us */}
      <Button
        title="Contact Us"
        onPress={() => Linking.openURL('mailto:support@readai.com')}
        icon={
          <Icon
            name="email"
            type="material"
            color="white"
          />
        }
      />
    </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  section: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});

export default AboutPage;