import { Image, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

const index = () => {
    const {user} = useAuthContext();

    useEffect(() => {
        if (user) {
          router.push('/menu');
        }
      }, [user, router]);

    return (
        <SafeAreaView style={{ backgroundColor: '#16423C', flex: 1 }}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <StatusBar style="light"/>
                <View className="flex flex-col gap-2 items-center justify-center font-rubik">
                    <Text className="text-secondary_color text-xl">bitebazaar</Text>
                        <Image
                            source={require("../assets/images/bitebazaar-home.png")}
                            style={{ width: 400, height: 400 }}
                            resizeMode="contain"
                        />
                        <Link href={"/dashboard"}>Hello</Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index;