import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons";
import Onboard from "../screens/auth/onboard";
import Settings from "../screens/Settings";
import Vote from "../screens/Vote";
import { View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCandidate from "../screens/AddCandidate";
import CandidateView from "../components/CandidateView";

export default function TabsNavigator() {
  const Tabs = createBottomTabNavigator();

  
  return (
    <Tabs.Navigator 
      initialRouteName="Dashboard" 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
            backgroundColor: "white",
            height: 80,
            paddingBottom: 10,
            padding: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginHorizontal: 5,
            position: "absolute",
            borderColor: "white",
            elevation: 10,
        },
        tabBarButton: (props)=>{
          return (
            <View {...props}>
                <View
                    style={{
                        minWidth: 50,
                        minHeight: 50,
                        borderRadius: 10,
                        backgroundColor: 
                        props.accessibilityState.selected
                            ? "#34a1eb"
                            : "white",
                    }}
                >
                    <TouchableOpacity {...props} />
                </View>
            </View>
        );
        }
      }}>
        <Tabs.Screen name="Home" component={Onboard} options={{
            tabBarIcon: ({ color }) => (
                  <Ionicons name="ios-home-outline" size={24} color={color} />
        )}}/>
        
        <Tabs.Screen name="VoteContain" component={LoggedStackNavigator} options={{
            title: "Voting",
            tabBarIcon: ({ color }) => (
                    <Ionicons name="person" size={24} color={color} />
        )}}/>
        
        <Tabs.Screen name="Settings" component={Settings} options={{
        title: "Settings",
        tabBarIcon: ({color})=>(
          <Ionicons name="settings-outline" size={24} color={color} />
        )}}/>

    </Tabs.Navigator>
  )
}

const LoggedStackNavigator = ( )=>{
  const Stacks = createNativeStackNavigator();
  const {Navigator, Screen} = Stacks;

  return (
    <Navigator>
      <Screen name="Vote" component={Vote} options={{ headerShown: false, title: "Voting" }} />
      <Screen name="AddCandidate" component={AddCandidate} options={{ headerShown: false, title: "Add Candidate" }} />
      <Screen name="CandidateView" component={CandidateView} options={{ headerShown: false, title: "Candidate View" }} />
    </Navigator>
  );
}