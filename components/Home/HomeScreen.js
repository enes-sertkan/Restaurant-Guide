import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import * as SQLite from "expo-sqlite";

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const db = SQLite.openDatabase("restaurantdb.db");
  const [result, setResult] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS restaurant (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(128), address TEXT(512), phone TEXT(32), rating TEXT(32), description TEXT(1024))`);
    });

    const listen = navigation.addListener("focus", () => {
      // TODO: replace null with pre-made restaurants data
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM restaurant ORDER BY id DESC`, null, 
          (txObj, res) => setResult(res.rows._array),
          (txObj, err) => console.log(err)
        );
      });

      
      console.log("Home Screen")
    });

    return listen;
  }, [navigation])

  const showRestaurants = () => {
    return result.map((restaurant, index) => {
      return (
          <View key={index} style={styles.row}>
            <Text>Name: {restaurant.name} </Text>
            <Text>Address: {restaurant.address}</Text>
            <Text>Phone: {restaurant.phone}</Text>
            <Text>Rating: {restaurant.rating}</Text>
            <Text>Description: {restaurant.description}</Text>
          </View>
      )
    })
  }

  if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' style={{height: "50%"}} />
      </View>
    )
  }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <View>
              <Text>Home Page</Text>
              {showRestaurants()}
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
    }
  });

export default HomeScreen