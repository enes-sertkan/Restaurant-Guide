import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = () => {
    // Perform the search and update the results state
    
  };

    return (
        <View style={styles.container}>
          <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchInput}
        placeholder="Search"
      />
      <Button onPress={handleSearch} title="Search" />
      <Text>{searchTerm}</Text>
      
      
      
         
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