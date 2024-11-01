import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

const index = () => {
    const {user} = useAuthContext();

    useEffect(() => {
        if (user) {
          router.push('/menu');
        }
      }, [user, router]);

      const handlePress = () => {
        router.push("/login");
      };

    return (
        <SafeAreaView style={{ backgroundColor: '#16423C', flex: 1 }}>
            <StatusBar style="light" backgroundColor="#16423C"/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="flex flex-col gap-3 items-center justify-center font-rubik py-14">
                    <Text className="text-secondary_color text-3xl uppercase">bitebazaar</Text>
                    <Image
                        source={require("../assets/images/bitebazaar-home.png")}
                        style={{ width: 400, height: 400 }}
                        resizeMode="contain"
                    />
                    <View className="flex flex-col gap-3 justify-center items-center">
                        <Text className="text-white text-4xl font-bold">Food delivery and More</Text>
                        <Text className="text-white text-lg font-semibold">Your number 1 Naija Shawarma & Burger plug!</Text>
                    </View>
                   <View className="justify-center items-center mt-2">
                        <TouchableOpacity className="bg-secondary_color p-4 w-full rounded-md" onPress={handlePress}>
                            <Text className="font-bold text-primary_color uppercase">Continue with Email</Text>
                        </TouchableOpacity>
                   </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index;