import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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
import LocationScreen from './LocationScreen';
const IMAGE_ARRAY = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

const Stack = createStackNavigator();

const DetailsScreen = ({navigation, route}) => {
    const res = route.params?.restaurant;
    const onShareViaEmail = () => {
        const subject = `Information about ${res.name}`;
        const body = `Name: ${res.name}\nAddress: ${res.address}\nPhone: ${res.phone}\nDescription: ${res.description}`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        Linking.openURL(url);
      };

    

    const Details = () => {
        return (
            <SafeAreaView style={styles.container}>
                <Image source={IMAGE_ARRAY[Math.floor(Math.random()*IMAGE_ARRAY.length)]} style={{ width: "100%", height: 200 }} resizeMode='cover' />
                <ScrollView style={styles.scrollView}>
                    <View>
                        <Text style={styles.heading}>{route.params?.restaurant.name}</Text>
                        <Text style={{ fontSize: 18 }}>{route.params?.restaurant.address}</Text>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>{route.params?.restaurant.phone}</Text>
                        <Text style={{ fontSize: 18 }}>{route.params?.restaurant.description}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.rating}>
                            <Text style={styles.ratingTxt}>
                                <Ionic name="star" size={30} />
                               {route.params?.restaurant.rating}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.directions} onPress={ () => navigation.navigate("Location", { res }) }>
                            <Text style={styles.shareTxt}>
                                <Ionic name="location" size={30} />
                               Directions
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.share} onPress={onShareViaEmail}>
                            <Text style={{ fontSize: 16 }}>
                                <Ionic name="share" size={30} />
                                Share
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* {console.log(route)} */}
                </ScrollView>
            </SafeAreaView>
        )
    }


    return (
        <Stack.Navigator>
            <Stack.Screen name="MainDetails" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    scrollView: {
        padding: 10
    },
    heading: {
        fontSize: 26
    },
    rating: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",
        width: "25%",
        backgroundColor: "#FFF970",
        marginRight: 5
        // elevation: 8,
        // shadowRadius: 20
    },
    share: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",
        width: "30%",
        backgroundColor: "#FF70F9",
        // marginRight: 5
        // elevation: 8,
        // shadowRadius: 20
    },
    directions: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",
        width: "35%",
        backgroundColor: "#70E5FF",
        marginRight: 5
        // elevation: 8,
        // shadowRadius: 20
    },
    ratingTxt: {
        fontSize: 20
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: "center",
      flexDirection: "row",
      marginVertical: 12,
      marginBottom: 30
    }
});

export default DetailsScreen