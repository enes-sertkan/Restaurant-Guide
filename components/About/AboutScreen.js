import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AboutCard from './AboutCard';
import shakilImage from './images/shakil.jpg';
import humaiyunImage from './images/humaiyun.jpg';

const AboutScreen = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <AboutCard
            name="Shakil Miah (101308549)"
            jobTitle="Senior Developer"
            image={shakilImage} 

          />
          <AboutCard
            name="Humaiyun Uddin (101309829)"
            jobTitle="Senior Developer"
            image={humaiyunImage} 

          />
            <StatusBar style="auto" />
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AboutScreen