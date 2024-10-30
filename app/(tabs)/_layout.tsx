import React from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartIcon from '@/components/CartIcon';

interface Icon {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: Icon) => {
  return (
    <View className='items-center justify-center gap-2'>
      <FontAwesome name={icon} size={24} color={color} />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFE5CF",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#16423C",
            height: 64,
            borderTopColor: "#fff",
            borderTopWidth: 1,
          },
        }}
      >
        <Tabs.Screen
          name='menu'
          options={{
            title: "Menu",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="bars" color={color} name="Menu" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name='find-us'
          options={{
            title: "Find Us",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="map-marker" color={color} name="Find Us" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name='about'
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="info-circle" color={color} name="About" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name='contact'
          options={{
            title: "Contact",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="envelope" color={color} name="Contact" focused={focused} />
            ),
          }}
        />
      </Tabs>

      <View className='absolute bottom-28 right-5 z-40'>
          <CartIcon/>
      </View>
    </>
  );
};

export default TabLayout;
