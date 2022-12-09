import React from 'react'
import { SafeAreaView, Text } from 'react-native'

const EditScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView>
        <Text>Edit Screen</Text>
        <Text>{route.params?.restaurant.name}</Text>
    </SafeAreaView>
  )
}

export default EditScreen