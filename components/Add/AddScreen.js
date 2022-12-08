import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import AddImage from "../../assets/add.png";

const AddScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
          <Image source={AddImage}
            style={{ 
              width: "100%", 
              height: 150
            }}
            resizeMode="contain"
          />
          <Text style={styles.heading}>Add a new restaurant</Text>
        <ScrollView style={styles.scrollView}>
          <TextInput style={styles.input} placeholder='Restaurant Name' />
          <TextInput style={styles.input} placeholder='Address' />
          <TextInput style={styles.input} keyboardType="phone-pad" placeholder='Phone Number' />
          <TextInput style={styles.input} keyboardType="numeric" placeholder='Rating' />
          <TextInput style={[styles.input, styles.descriptionInput]} placeholder='Description' multiline numberOfLines={10}/>
        </ScrollView>
        
      </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    scrollView: {
      width: "100%",
    },
    heading: {
      fontSize: 24,
      marginTop: 3,
    },
    input: {
      borderWidth: 1,
      alignSelf: 'stretch',
      margin: 10,
      height: 50,
      borderRadius: 10,
      padding: 15

    },
    descriptionInput: {
      height: 120,
      textAlignVertical: "top"
    }
  });

export default AddScreen