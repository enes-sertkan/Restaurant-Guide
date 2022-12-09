import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Ionic from "react-native-vector-icons/Ionicons";
import * as SQLite from "expo-sqlite";


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
                <Text key={index}>{restaurant.name}</Text>
              ))
            }

          </View>
        

        </ScrollView>
      </SafeAreaView>
    )
}

const SearchCard = ({ name, jobTitle, image }) => {
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
  });

export default SearchScreen