import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, ScrollView, Button, TouchableOpacity, RefreshControl, Dimensions, Image } from 'react-native';
import EditScreen from './EditScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Ionic from "react-native-vector-icons/Ionicons";
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


import DetailsScreen from './DetailsScreen';
import * as SQLite from "expo-sqlite";


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const deviceWidth = Math.round(Dimensions.get('window').width);

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
      setCurrId(null)
      db.transaction(tx => {
        tx.executeSql(`SELECT * FROM restaurant ORDER BY id DESC`, null, 
          (txObj, res) => setResult(res.rows._array),
          (txObj, err) => console.log(err)
        );
      });
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
              <View style={styles.cardContainer} key={index}>
                
                <TouchableOpacity onPress={ () => { navigation.navigate("Details", { restaurant }) } }>
                  <Image style={styles.picture} source={IMAGE_ARRAY[Math.floor(Math.random()*IMAGE_ARRAY.length)]} />

                  <View>
                    <Text style={styles.name}>{restaurant.name} </Text>
                    {/* TO DO: Convert Rating to Badge */}
                    <Text style={styles.rating}> 
                      <Ionic name="star" size={15} /> &nbsp;
                      {restaurant.rating}/5
                    </Text>     
                  </View>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity key={restaurant.id} style={styles.updateButton} onPress={ () => { navigation.navigate("Edit", { restaurant }) } }>
                    <Text>
                      <Ionic name="pencil" size={15} />
                      Edit
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity key={restaurant.id} style={styles.detailsButton} onPress={ () => { navigation.navigate("Details", { restaurant }) } }>
                    <Text>
                      <Ionic name="information-outline" size={15} />
                      Details
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRestaurant(restaurant.id)}>
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
        {/* {
          result.map((restaurant, index) => {
            return (
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
        } */}
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
          <Stack.Screen name="Details" component={DetailsScreen} />
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
    detailsButton: {
      backgroundColor: "#70FFBA",
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
      height: 300,
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

export default HomeScreen