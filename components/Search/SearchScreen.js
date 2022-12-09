import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredList = list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredList(filteredList);

  };

    return (
        <View style={styles.container}>
          <TextInput
            value={searchQuery}
            //onChangeText={(query) => handleSearch(query)}
            placeholder="Enter search query"
            style={styles.searchInput}
          />
          {/* {filteredList && (
        <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        
      )} */}
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