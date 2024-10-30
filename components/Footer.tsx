import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import WaveSvg from "@/assets/svg/MyShape";

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <View className="relative w-full h-full bg-primary_color">
            <View className="absolute top-0 left-0 w-full" style={{ height: 100, zIndex: 1 }}>
                <WaveSvg />
            </View>
            <View className="bg-primary_color w-full h-full pt-20 pb-6">
                <View className="flex flex-col gap-4 items-center justify-center">
                    <Text className="text-secondary_color text-4xl font-bold pb-2">BiteBazaar</Text>
                    <View className="flex flex-col gap-4">
                        <View className="w-full flex flex-col gap-4">
                            <Text className="text-white text-lg">Block 114 Plot 4, Akiogun street, Oniru, Victoria island, Lagos state</Text> 
                            <Text className="font-bold text-white">TEL: +2348163887385</Text> 
                            <Text className="font-bold text-white">Email: Sales@BiteBazaar.com</Text> 
                        </View>
                        <View className="w-full flex flex-col gap-4">
                            <Link href={"https://www.facebook.com/maludatech/"} className="flex flex-row items-center text-white">
                                <View className="flex flex-row items-center gap-1">
                                    <FontAwesomeIcon name={"facebook"} size={16} color={"#fff"}/>
                                    <Text className="text-lg text-white">Facebook</Text>
                                </View>
                            </Link>
                            <Link href={"https://www.instagram.com/maludatech/"} className="flex flex-row items-center">
                                <View className="flex flex-row items-center gap-1">
                                    <FontAwesomeIcon name={"instagram"} size={16} color={"#fff"}/>
                                    <Text className="text-lg text-white">Instagram</Text>
                                </View>
                            </Link>

                        </View>
                        <Text className="uppercase pt-4 text-white">© Copyright © {currentYear} bitebazaar. All rights reserved.</Text>
                        <Text className="font-bold text-3xl text-center font-pacifico text-white">Original</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Footer