import React from 'react'
import {View, Text, Image, StyleSheet, Dimensions } from 'react-native';



const AboutCard = () => {
  return (
    <View style={styles.cardContainer}>
        <Image style={styles.picture} source={require('./images/shakil.jpg')} />
        <Text style={styles.name}>Shakil Miah (101308549)</Text>
        <Text style={styles.jobTitle}>Senior Developer</Text>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    cardContainer: {
     //alignItems: 'center',
      //padding: 20,
      width: deviceWidth - 40,
      backgroundColor: '#F4F4F4',
      height: 260,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.5,
      elevation: 5,
      shadowRadius: 10,
    },
    picture: {
      width: deviceWidth - 40,
      height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      paddingLeft:15,
    },
    jobTitle: {
      fontSize: 14,
      color: 'grey',
      marginTop: 5,
      paddingLeft:15,
    },
  });

export default AboutCard
