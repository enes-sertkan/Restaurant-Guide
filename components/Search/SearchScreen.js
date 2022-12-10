import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";
import img1 from "../../assets/images/1-burger.jpg";
import img2 from "../../assets/images/2-taco.jpg";
import img3 from "../../assets/images/3-noodles.jpg";
import img4 from "../../assets/images/4-chicken.jpg";
import img5 from "../../assets/images/5-beefpatty.jpg";
import img6 from "../../assets/images/6-fishandchips.jpg";
import img7 from "../../assets/images/7-sandwich.jpg";
import img8 from "../../assets/images/8-mashedpotato.jpg";
import img9 from "../../assets/images/9-dimsum.jpg";
import img10 from "../../assets/images/10-jjajangmyeon.jpg";
import img11 from "../../assets/images/11-ramen.jpg";
import img12 from "../../assets/images/12-kalguksu.jpg";
import img13 from "../../assets/images/13-potroast.jpg";
import img14 from "../../assets/images/14-frenchfries.jpg";
import img15 from "../../assets/images/15-beer.jpg";

const IMAGE_ARRAY = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];
const deviceWidth = Math.round(Dimensions.get('window').width);

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [isPressed, setIsPressed] =  useState(false);

  const [db, setDb] = useState(SQLite.openDatabase("restaurantdb.db"));
  const [result, setResult] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    // Perform the search and update the results state
    //`SELECT * FROM restaurant WHERE name LIKE '% ? %' OR name LIKE '? %' OR name LIKE '% ?' OR name LIKE '?'`, [searchTerm]
    setSearchResult(result.filter(res => {
      const name = res.name.toLowerCase();
      const description = res.description.toLowerCase();
      const searched = searchTerm.toLowerCase();

      return name.includes(searched) || description.includes(searched);
    }));
    console.log(searchResult)
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM restaurant ORDER BY id DESC`, null,
        (txObj, res) => setResult(res.rows._array),
        (txObj, err) => console.log(err)
      );
    });
  }, []);

  const handleChangedText = (text) => {
    setSearchTerm(text);
    setSearchResult([]);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
            <TextInput
              value={searchTerm}
              onChangeText={(text) => handleChangedText(text)}
              style={styles.searchInput}
              placeholder="Search"
            />
            <TouchableOpacity onPress={ handleSearch }>
              <Ionic name="search" size={30} />
            </TouchableOpacity>

            {/* <Button onPress={() => console.log(searchResult)} title="CONSOLE LOG" /> */}

            {/* <Text>{searchTerm}</Text> */}

          {
            searchResult.map((restaurant, index) => (
              <View style={styles.cardContainer} key={index}>
                <Image style={styles.picture} source={IMAGE_ARRAY[Math.floor(Math.random()*IMAGE_ARRAY.length)]} />

                <View>
                  <Text style={styles.name}>{restaurant.name} </Text>
                  {/* TO DO: Convert Rating to Badge */}
                  <Text style={styles.rating}> {restaurant.rating}/5</Text>     
                </View>
                <View style={styles.buttonContainer}>
                </View>
              </View>
            ))
          }

        </View>
      

      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    searchInput: {
      borderColor: '#ccc',
      borderRadius: 4,
      borderWidth: 1,
      fontSize: 16,
      padding: 8,
      width: '90%',
      borderRadius: 20,
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
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },
    heading: {
      fontSize: 20,
      marginTop: 3,
    },
    row: {
      borderWidth: 1,
      padding: 5,
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "stretch",
      justifyContent: "space-between",
      margin: 8
    },
    deleteBtn: {
      backgroundColor: "#FF7070",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'auto',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 20,
      elevation: 10
    },
    updateBtn: {
      backgroundColor: "#70E5FF",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'auto',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      elevation: 10,
      marginRight: 10,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 12
    },
    cardContainer: {
      width: deviceWidth - 40,
      backgroundColor: '#F4F4F4',
      height: 250,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.5,
      elevation: 5,
      shadowRadius: 10,
      marginBottom: 20,
    },
    rating: {
      fontSize: 14,
      color: 'grey',
      marginTop: 5,
      paddingLeft:15,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      paddingLeft:15,
    },
    picture: {
      width: deviceWidth - 40,
      height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    updateButton: {
      backgroundColor: "#70E5FF",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'auto',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      elevation: 10,
      marginRight: 10,
      width: 100,
      


    },
    deleteButton: {
      backgroundColor: "#FF7070",
      alignItems: "center",
      justifyContent: 'center',
      alignSelf: 'auto',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderRadius: 20,
      elevation: 10,
      width: 100,
      

    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 12,
        paddingTop: 15,
      

    }
  });

export default SearchScreen