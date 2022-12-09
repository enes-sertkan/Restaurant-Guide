import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AddImage from "../../assets/edit.png";

import * as SQLite from "expo-sqlite";

const EditScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const [db, setDb] = useState(SQLite.openDatabase("restaurantdb.db"));
  const [result, setResult] = useState([]);

  useEffect(() => {
    const listen = navigation.addListener("focus", () => {
      console.log("Edit Screen")
      setName(route.params?.restaurant.name);
      setAddress(route.params?.restaurant.address);
      setPhone(route.params?.restaurant.phone);
      setRating(route.params?.restaurant.rating);
      setDescription(route.params?.restaurant.description);
      
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM restaurant`, null, 
          (txObj, res) => setResult(res.rows._array),
          (txObj, err) => console.log(err)
        );
      });
    })

    return listen;

  }, [navigation])

  const handleReset = () => {
    setName("")
    setAddress("")
    setPhone("")
    setRating("")
    setDescription("")
  }
  const handleCancel = () => {
    setName("")
    setAddress("")
    setPhone("")
    setRating("")
    setDescription("")
    navigation.goBack();
  }
  
  const handleSubmit = () => {
    if(name === "" || address === "" || phone === "" || rating  === "" || description === "") {
      Alert.alert("❗ Error - Empty Fields", "Please fill in the empty fields")
    } else {
      db.transaction(tx => {
        tx.executeSql("UPDATE restaurant SET name=?, address=?, phone=?, rating=?, description=? where id = ?", 
          [name, address, phone, rating, description, route.params?.restaurant.id],
          (txObj, resultSet) => {
            if(resultSet.rowsAffected > 0) {
                let existingRestaurants = [...result];
                const indexToUpdate = existingRestaurants.findIndex(res => res.id === route.params?.restaurant.id);
                existingRestaurants[indexToUpdate].name = name;
                existingRestaurants[indexToUpdate].address = address;
                existingRestaurants[indexToUpdate].phone = phone;
                existingRestaurants[indexToUpdate].rating = rating;
                existingRestaurants[indexToUpdate].description = description;
                //console.log(existingRestaurants[indexToUpdate])
                // existingRestaurants.push({ id: resultSet.insertId, name, address, phone, rating, description});
                handleReset();
                navigation.goBack(); //navigate("MainHome", { updatedRestaurant: existingRestaurants[indexToUpdate], indexToUpdate });
            }
          },
          (txObj, err) => console.log(err)
        );
      })
    }

  } 

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Image source={AddImage}
            style={{ 
                width: "100%", 
                height: 125
            }}
            resizeMode="contain"
            />
            <Text style={styles.heading}>Edit existing restaurant</Text>
            
            <TextInput value={name} style={styles.input} placeholder='Restaurant Name' onChangeText={ (name) => setName(name) } />
            <TextInput value={address} style={styles.input} placeholder='Address' onChangeText={ (address) => setAddress(address) } />
            <TextInput value={phone} style={styles.input} keyboardType="phone-pad" placeholder='Phone Number' onChangeText={ (phone) => setPhone(phone) } />
            <TextInput value={rating} style={styles.input} keyboardType="numeric" placeholder='Rating (0 to 5)' onChangeText={ (rating) => setRating(rating) } />
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
      width: "100%",
      paddingLeft: "22%"

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

export default EditScreen