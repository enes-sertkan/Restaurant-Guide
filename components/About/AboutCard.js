import React from 'react'
import {View, Text, Image, StyleSheet } from 'react-native';



const AboutCard = () => {
  return (
    <View style={styles.cardContainer}>
        <Image style={styles.picture} source={require('./images/shakil.jpg')} />
        <Text style={styles.name}>Shakil</Text>
      <Text style={styles.jobTitle}>Senior Developer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      padding: 20,
    },
    picture: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    jobTitle: {
      fontSize: 14,
      color: 'grey',
      marginTop: 5,
    },
  });

export default AboutCard
