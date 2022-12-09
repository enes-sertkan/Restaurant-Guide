import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AddImage from "../../assets/add.png";

import * as SQLite from "expo-sqlite";

const AddScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [isFilledOut, setIsFilledOut] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [currentRes, setCurrentRes] = useState({});
  const [query, setQuery] = useState("")

  const [db, setDb] = useState(SQLite.openDatabase("restaurantdb.db"));
  const [result, setResult] = useState([]);

  useEffect(() => {
    const listen = navigation.addListener("focus", () => {
      // setResult([]);
      // setCurrentRes({});
      // Check if page was redirected by the update button
      // (route.params?.result.length > 0) ? setIsEdit(true) : setIsEdit(false)
      // console.log(route.params?.id);
      // `UPDATE restaurant SET name=?, address=?, phone=?, rating=?, description=? where id = ?`, 
      // [name, address, phone, rating, description, route.params?.result.id]
      console.log("Add Screen")


      // if(route.params?.result && route.params?.id) {
      //   //console.log(route.params?.result);
      //   console.log(route.params?.result.filter(res => res.id === route.params.id)[0]);
      //   setCurrentRes(route.params?.result.filter(res => res.id === route.params.id)[0])
      //   setIsEdit(true);
      // } else {
      //   setIsEdit(false);
      //   setQuery("INSERT INTO restaurant (name, address, phone, rating, description) values (?, ?, ?, ?, ?)")
      // }

      // TODO: replace null with pre-made restaurants data
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

    setIsFilledOut(false);
    console.log("ADD SCREEN -> Reset Clicked")
  }
  const handleCancel = () => {
    setName("")
    setAddress("")
    setPhone("")
    setRating("")
    setDescription("")
    
    setIsFilledOut(false);

    navigation.navigate("Home")
    console.log("ADD SCREEN -> Cancel Clicked")
  }
  
  const handleSubmit = () => {
    if(name === "" || address === "" || phone === "" || rating  === "" || description === "") {
      //setIsFilledOut(false);
      Alert.alert("❗ Error - Empty Fields", "Please fill in the empty fields")
    } else {
      //setIsFilledOut(true);
      console.log(name, address, phone, rating, description);
      db.transaction(tx => {
        tx.executeSql("INSERT INTO restaurant (name, address, phone, rating, description) values (?, ?, ?, ?, ?)", 
          [name, address, phone, rating, description],
          (txObj, resultSet) => {
            let existingRestaurants = [...result];
            existingRestaurants.push({ id: resultSet.insertId, name, address, phone, rating, description});
            handleReset();
          },
          (txObj, err) => console.log(err)
        );
      })
    }

    // if(isFilledOut) {
    // } else {
    //   Alert.alert("❗ Error - Empty Fields", "Please fill in the empty fields")
    //   console.log("ADD SCREEN -> Submit: IS NOT FILLED")
    // }

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
        {isEdit ? <Text style={styles.heading}>Edit existing restaurant</Text> : <Text style={styles.heading}>Add a new restaurant</Text>}
        {/* <Text style={styles.heading}>Add a new restaurant</Text> */}
        
      <ScrollView style={styles.scrollView}>

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