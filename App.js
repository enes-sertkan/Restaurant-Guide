import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionic from "react-native-vector-icons/Ionicons";
import AboutScreen from './components/About/AboutScreen';
import AddScreen from './components/Add/AddScreen';
import HomeScreen from './components/Home/HomeScreen';
import SearchScreen from './components/Search/SearchScreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, colour}) => {
            let iconName;
            if(route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "About") {
              iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
            } else if (route.name === "Add") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "ios-search-circle" : "ios-search-circle-outline";
            }
            return <Ionic name={iconName} size={size} colour={colour} />
          }
        })}
      >
        <Tab.Screen name="Home"  component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        
      </Tab.Navigator>

      {/* <Stack.Navigator>
        <Stack.Screen name="Edit" />
      </Stack.Navigator> */}
      
    </NavigationContainer>
  );
}


