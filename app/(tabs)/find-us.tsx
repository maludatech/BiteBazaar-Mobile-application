import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useEffect} from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '@/context/AuthContext';
import Footer from '@/components/Footer';

const FindUs = () => {
    const {user} = useAuthContext();

    useEffect(() => {
        if (!user){
          router.push('/login');
        }
    }, [user]);

  return (
    <SafeAreaView style={{backgroundColor:"#16423C" ,flex:1}}>
        <StatusBar  backgroundColor='#16423C' style='light'/>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View className='flex flex-col gap-4 py-14 font-rubik'>
                <Text className='text-center font-bold text-4xl text-white uppercase'>Find Us</Text>
            </View>
            <Footer/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default FindUs;