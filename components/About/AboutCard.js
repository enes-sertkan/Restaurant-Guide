import React from 'react'
import {View, Text, Image, StyleSheet, Dimensions } from 'react-native';


const AboutCard = ({ name, jobTitle, image }) => {
  return (
    <View style={styles.cardContainer}>
    <Image style={styles.picture} source={image} />
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.jobTitle}>{jobTitle}</Text>
    </View>
  </View>
  )
}

const staff = [{
    name: 'Shakil Miah',
    jobTitle: 'Senior Developer',
    picture: require('./images/shakil.jpg'),

},{
    name: 'Humaiyun Uddin',
    jobTitle: 'Senior Developer',
    picture: require('./images/humaiyun.jpg'),
}]

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    cardContainer: {
      width: deviceWidth - 40,
      backgroundColor: '#F4F4F4',
      height: 260,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.5,
      elevation: 5,
      shadowRadius: 10,
      marginBottom: 20,
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
