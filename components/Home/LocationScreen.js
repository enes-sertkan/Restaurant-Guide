import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';
import Ionic from "react-native-vector-icons/Ionicons";

const LocationScreen = ({ navigation, route }) => {
    const [latLng, setLatLng] = useState({});

    console.log()

    const fetchGeocode = async () => {
        const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=X3AaP9joQdh04SfTypgNbmwq45NYXb3s&location=${route.params?.res.address}`);
        const resObj =  await res.json();
        setLatLng({...resObj})
        console.log(resObj);
    }

    useEffect(() => {
        fetchGeocode();
    }, []);



    return (
        <SafeAreaView style={{ backgroundColor: "#FFF"}}>
            {
                latLng.results ? (
                    <>
                        <View style={styles.viewContainer}>
                            {/* {console.log(latLng?.results[0]?.locations[0]?.displayLatLng?.lat)}
                            {console.log(latLng?.results[0]?.locations[0]?.displayLatLng?.lng)} */}
                            <MapView 
                                style={styles.map} 
                                initialRegion={{
                                    // latitude: 43.6754238,
                                    // longitude: -79.4073607,
                                    latitude: latLng?.results[0]?.locations[0]?.displayLatLng?.lat,
                                    longitude: latLng?.results[0]?.locations[0]?.displayLatLng?.lng,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker coordinate={{ latitude: latLng?.results[0]?.locations[0]?.displayLatLng?.lat, longitude: latLng?.results[0]?.locations[0]?.displayLatLng?.lng,}}>
                                    <Callout>
                                        <Text>{route.params?.res.name}</Text>
                                    </Callout>
                                </Marker>
                            </MapView>
                        </View>
                        <TouchableOpacity style={styles.directions} >
                            <Text style={styles.shareTxt}>
                                <Ionic name="location" size={30} />
                                Open in Google Maps
                            </Text>
                        </TouchableOpacity>
                    </>
                    
                ) : <ActivityIndicator />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    viewContainer: {
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 10,
        height: "80%",
        marginBottom: 10
    },
    map: {
      width: '100%',
      height: '100%',
    },
    directions: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#70E5FF",
        marginHorizontal: 20,
        marginBottom: 20,
        elevation: 8,
        // shadowRadius: 20
    }
});

export default LocationScreen