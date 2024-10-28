import { View, Text, ScrollView } from 'react-native';
import React,{useEffect, useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuthContext } from '@/context/AuthContext';

const RestorePassword = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/menu');
    }
  }, [user, router]);

  return (
    <SafeAreaView style={{backgroundColor: "#fff",flex: 1}}>
      <StatusBar style="light" backgroundColor="#16423C"/>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text>RestorePassword</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RestorePassword;