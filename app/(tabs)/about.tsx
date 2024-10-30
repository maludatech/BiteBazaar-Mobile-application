import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useEffect} from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '@/context/AuthContext';
import Footer from '@/components/Footer';

const About = () => {
    const {user} = useAuthContext();

    useEffect(() => {
        if (!user){
          router.push('/login');
        }
    }, [user]);

  return (
    <SafeAreaView style={{backgroundColor:"#16423C" ,flex:1}}>
        <StatusBar backgroundColor='#16423C' style='light'/>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View className='flex flex-col pt-10 font-rubik'>
                <View className="bg-[#9c9999] h-fit w-full p-8 py-16">
                    <View className="border-y-2 border-slashes border-white">
                        <View className="p-10">
                            <Text className="text-4xl text-center font-bold text-white">ABOUT US</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-[#1C2123] h-full w-full">
                    <View className="px-8 pt-16">
                        <View className="border-t-2 flex flex-col gap-28 border-spacing-10 border-primary_color">
                            <View className="flex flex-col gap-6 py-4">
                                <Text className="text-secondary_color text-center text-2xl font-bold">ABOUT BITEBAZAAR</Text>
                                <Text className='text-[#7A7A7A]'>Welcome to BiteBazaar, where authentic Middle Eastern vibes meet smoky Naija flavor!</Text>
                                <Text className='text-[#7A7A7A]'>As Naija’s soon-to-be fastest growing cloud kitchen, we are dedicated to serving you the most delicious and mouthwatering shawarma you’ll ever taste.</Text>
                                <Text className='text-[#7A7A7A]'>Our story is one with a passion for food and love for nature in plants and seeds that build up in culinary traditions across the Middle East and Africa.</Text>
                                <Text className='text-[#7A7A7A]'>At BiteBazaar, we believe that great-tasting food brings people together, and that’s why we’ve crafted a menu that offers something for everyone. From our signature shawarmas and burgers to our flavorful smoked birds marinated to perfection and garnished with fresh vegetables, where every bite is a celebration of flavor.</Text>
                                <Text className='text-[#7A7A7A]'>We source only the finest ingredients, ensuring that every wrap, platter and box is made with care and attention to detail and under the strictest standards of food safety and hygiene.</Text>
                                <Text className='text-[#7A7A7A]'>Our homemade sauces and freshly baked pita bread are the perfect complements to our savory meats and crisp vegetables, providing a balanced and satisfying meal every time.</Text>
                                <Text className='text-[#7A7A7A]'>BiteBazaar is more than just great tasting food, it’s family, its culture and it is a celebration of Africa.</Text>
                                <Text className='text-[#7A7A7A]'>Our friendly staff are trained and passionately dedicated to providing top notch service, making sure your orders taste just right and delivered timeously.</Text>
                                <Text className='text-[#7A7A7A]'>BiteBazaar is your go-to for quick, reliable service when you are hungry or simply craving an unforgettable experience.</Text>
                                <Text className='text-[#7A7A7A]'>Welcome to BiteBazaar</Text>
                            </View>
                            <View className=" flex flex-col gap-4 justify-center">
                                <View className="flex flex-col items-center">
                                    <Text className="text-secondary_color font-lato text-5xl">Original</Text>
                                    <Text className="font-rubik text-6xl text-white">Chicken</Text>
                                    <Text className="font-lato text-5xl text-white">Burger</Text>
                                </View>
                                <View className="w-full h-full items-center relative">
                                    <Image
                                        source={require("../../assets/images/brush-bg.png")}
                                        alt="chicken-burger"
                                        resizeMode='contain'
                                        style={{ width: 320, height: 320}}
                                    />
                                    <Image
                                        source={require("../..//assets/images/fish-burger.png")}
                                        alt="chicken-burger"
                                        className="absolute top-0 left-0 z-20"
                                        resizeMode='contain'
                                        style={{ width: 300, height: 300}}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Footer/>        
        </ScrollView>
    </SafeAreaView>
  )
}

export default About;