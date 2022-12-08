import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AddImage from "../../assets/add.png";

const AddScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [isFilledOut, setIsFilledOut] = useState(false);

  const handleReset = () => {
    setName("")
    setAddress("")
    setPhone("")
    setRating("")
    setDescription("")
    console.log("ADD SCREEN -> Reset Clicked")
  }
  const handleCancel = () => {
    setName("")
    setAddress("")
    setPhone("")
    setRating("")
    setDescription("")
    navigation.navigate("Home")
    console.log("ADD SCREEN -> Cancel Clicked")
  }
  
  const handleSubmit = () => {
    if(name === "" || address === "" || phone === "" || rating  === "" || description === "") {
      setIsFilledOut(false);
    } else {
      setIsFilledOut(true);
    }

    if(isFilledOut) {
      console.log(name, address, phone, rating, description);
    } else {
      Alert.alert("❗ Error - Empty Fields", "Please fill in the empty fields")
      console.log("ADD SCREEN -> Submit: IS NOT FILLED")
    }

  } 

  return (
    <SafeAreaView style={styles.container}>
        <Image source={AddImage}
          style={{ 
            width: "100%", 
            height: 125
          }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Add a new restaurant</Text>
      <ScrollView style={styles.scrollView}>

        <TextInput value={name} style={styles.input} placeholder='Restaurant Name' onChangeText={ (name) => setName(name) } />
        <TextInput value={address} style={styles.input} placeholder='Address' onChangeText={ (address) => setAddress(address) } />
        <TextInput value={phone} style={styles.input} keyboardType="phone-pad" placeholder='Phone Number' onChangeText={ (phone) => setPhone(phone) } />
        <TextInput value={rating} style={styles.input} keyboardType="numeric" placeholder='Rating' onChangeText={ (rating) => setRating(rating) } />
        <TextInput value={description} style={[styles.input, styles.descriptionInput, {marginBottom: 10}]} placeholder='Description' multiline numberOfLines={10} onChangeText={ (description) => setDescription(description) } />


        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.submitBtn} onPress={ handleSubmit } >
            <Text style={{  }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={ handleCancel  } >
            <Text style={{  }}>Cancel</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.resetBtn} onPress={ handleReset } >
            <Text style={{  }}>Reset</Text>
          </TouchableOpacity>
        

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
      fontSize: 20,
      marginTop: 3,
    },
    input: {
      borderWidth: 1,
      alignSelf: 'stretch',
      margin: 10,
      height: 50,
      borderRadius: 10,
      padding: 15,
      marginHorizontal: 32

    },
    descriptionInput: {
      height: 120,
      textAlignVertical: "top"
    },
    submitBtn: {
      backgroundColor: "#70FFBA",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 64,
      marginTop: 10,
      marginHorizontal: 16,
      borderRadius: 20,
      elevation: 5
    },
    cancelBtn: {
      backgroundColor: "#FF7070",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginTop: 10,
      marginHorizontal: 16,
      borderRadius: 20,
      elevation: 5
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 12
    },
    resetBtn: {
      backgroundColor: "#70E5FF",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'stretch',
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginTop: 10,
      marginHorizontal: 40,
      borderRadius: 20,
      marginBottom: 64,
      elevation: 5
    },
  });

export default AddScreen