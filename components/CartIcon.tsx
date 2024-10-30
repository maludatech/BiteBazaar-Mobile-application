"use client"

import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartModal from "./modal/CartModal";
import { useCartContext } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";

const CartIcon = () => {
    const { cart } = useCartContext();
    const { user } = useAuthContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const productNumber = cart.length;

    return (
        <View>
            <TouchableOpacity
                className="bg-secondary_color items-center justify-center flex relative p-4 rounded-md duration-300 transition ease-in-out font-rubik hover:cursor-pointer hover:scale-105"
                onPress={() => setIsModalOpen(true)}
            >
                <View className="absolute -top-3 -right-3 rounded-full bg-[#dd2222] w-[30px] h-[30px] text-center flex justify-center items-center text-xs text-white">
                    <Text className="text-white">{user ? productNumber : 0}</Text>
                </View>
                <FontAwesome name="shopping-cart" size={24} color="#16423C"/>
            </TouchableOpacity>

            {/* Cart Modal */}
            <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </View>
    );
};

export default CartIcon;
