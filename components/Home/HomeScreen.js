import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, ScrollView, Button, TouchableOpacity, RefreshControl } from 'react-native';
import EditScreen from './EditScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Ionic from "react-native-vector-icons/Ionicons";

import * as SQLite from "expo-sqlite";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation, route }) => {
  const Stack = createStackNavigator();

  const [isLoading, setIsLoading] = useState(false);
  const [currId, setCurrId] = useState(null);

  const db = SQLite.openDatabase("restaurantdb.db");
  const [result, setResult] = useState([]);


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    console.log(refreshing)
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM restaurant ORDER BY id DESC`, null, 
        (txObj, res) => setResult(res.rows._array),
        (txObj, err) => console.log(err)
      );
    });
  }, [refreshing]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS restaurant (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT(128), address TEXT(512), phone TEXT(32), rating TEXT(32), description TEXT(1024))`);
    });
    const listen = navigation.addListener("focus", () => {

      // console.log(route.params?.updatedRestaurant);
      // console.log(route.params?.indexToUpdate);

      // if (route.params?.updatedRestaurant) {
      //   currentRestaurants = [...result];
      //   console.log(currentRestaurants);
      // }

      setCurrId(null)
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

  const ShowRestaurants = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }
        >
        {
          result.map((restaurant, index) => {
            return (
              // TODO: Change to FlatList
                <View key={index} style={styles.row}>
                  <Text>Name: {restaurant.name} </Text>
                  <Text>Address: {restaurant.address}</Text>
                  <Text>Phone: {restaurant.phone}</Text>
                  <Text>Rating: {restaurant.rating}</Text>
                  <Text>Description: {restaurant.description}</Text>
      
                  <View style={styles.btnContainer}>
      
                    <TouchableOpacity key={restaurant.id} style={styles.updateBtn} onPress={ () => { navigation.navigate("Edit", { restaurant }) } }>
                      <Text>
                        <Ionic name="pencil" size={15} />
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteRestaurant(restaurant.id)}>
                      <Text>
                        <Ionic name="trash" size={15} />
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )
          })
        }
        </ScrollView>
      </SafeAreaView>
      
      

      
    )
  }

  const deleteRestaurant = (id) => {
    db.transaction(tx => {
      tx.executeSql(`DELETE FROM restaurant WHERE id = ?`, [id],
        (txObj, resultSet) => {
          if(resultSet.rowsAffected > 0) {
            let existingRestaurants = [...result].filter(res => res.id !== id);
            setResult(existingRestaurants);
          }
        },
        (txObj, err) => console.log(err)
      );
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
      <>
        <Stack.Navigator initialRouteName='MainHome'>
          <Stack.Screen name="MainHome" component={ShowRestaurants} options={{ headerShown: false }} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
        <SafeAreaView style={styles.container}>
          <ScrollView>
              {showRestaurants()}
          </ScrollView>
        </SafeAreaView> */}
      </>
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
  });

export default HomeScreen