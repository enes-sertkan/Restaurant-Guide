import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeScreen