import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' style={{height: "50%"}} />
      </View>
    )
  }

    return (
      <SafeAreaView style={styles.container}>
            <Text styles={styles.heading}>Your Restaurants</Text>

        <View>
            <Text>Home Page</Text>
            <StatusBar style="auto" />
        </View>
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
  });

export default HomeScreen