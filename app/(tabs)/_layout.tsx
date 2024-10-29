import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Icon{
  icon: string;
  color: string;
  name: string,
  focused: boolean;
}

const TabIcon = ({icon, color, name, focused}: Icon) => {
    return( 
      <View className='items-center justify-center gap-2'>
        <FontAwesome name={icon} size={24} color={color} /> 
        <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{color: color}}>{name}</Text>
      </View>
    )
  }

const TabLayout = () => {
  return (
    <>
        <Tabs screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor:"#2563eb", tabBarInactiveTintColor: "#64748b", tabBarStyle:{backgroundColor: "#fff", height: 64}}}>
          {/*  borderTopWidth: 1, borderTopColor: "#64748b" */}
        <Tabs.Screen name='dashboard' options={{title: "dashboard", headerShown: false, tabBarIcon: ({color, focused})=>(
          <TabIcon icon="home" color={color} name={"Dashboard"} focused={focused}/>
        )}}/>
         <Tabs.Screen name='profile' options={{title: "profile", headerShown: false, tabBarIcon: ({color, focused})=>(
          <TabIcon icon="user" color={color} name={"Profile"} focused={focused}/>
        )}}/>
        <Tabs.Screen name='deposit' options={{title: "deposit", headerShown: false, tabBarIcon: ({color, focused})=>(
          <TabIcon icon="plus" color={color} name={"Deposit"} focused={focused}/>
        )}}/>
        <Tabs.Screen name='withdrawal' options={{title: "withdrawal", headerShown: false, tabBarIcon: ({color, focused})=>(
          <TabIcon icon="dollar" color={color} name={"Withdrawal"} focused={focused}/>
        )}}/>
        <Tabs.Screen name='support' options={{title: "support", headerShown: false, tabBarIcon: ({color, focused})=>(
          <TabIcon icon="envelope" color={color} name={"Support"} focused={focused}/>
        )}}/>
        </Tabs>
    </>
  )
}

export default TabLayout;
