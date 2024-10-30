import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useCartContext } from '@/context/CartContext';
import { useAuthContext } from '@/context/AuthContext';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  if (!isOpen || !user) return null;

  const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const total = subtotal;

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }} className="flex-1 justify-center items-center px-4">
        <View className="w-full bg-green-900 rounded-lg">

          {/* Header with cart item count and close button */}
          <View className="flex flex-row justify-between items-center bg-primary_color p-3 rounded-t-lg">
            <Text className="text-lg uppercase text-white">Shopping Cart ({cart.length})</Text>
            <IonIcon name="close-outline" size={24} color="white" onPress={onClose} />
          </View>

          {/* Cart content */}
          {cart.length === 0 ? (
            <View className="flex flex-col py-6 gap-8 justify-center items-center">
              <Text className="text-lg text-white">There are no products in the cart 😣!</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-white underline text-[16px]">Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Cart items */}
              <ScrollView className="max-h-[25vh]">
                {cart.map((product) => (
                  <View key={product.id} className="flex flex-row justify-between items-center p-2 border-b border-gray-300">
                    <View className="flex-row items-center flex-1">
                      <Image
                        source={{ uri: product.imageUrl }}
                        style={{ width: 60, height: 60, borderRadius: 8 }}
                        className="mr-4"
                      />
                      <View className="flex-1">
                        <Text className="font-bold text-[15px]">{product.name}</Text>
                        <Text className="text-[12px] text-gray-600">NGN {product.price}.00</Text>
                      </View>
                    </View>

                    {/* Quantity control */}
                    <View className="flex-row items-center bg-gray-200 p-1 rounded-md">
                      <TouchableOpacity onPress={() => product.quantity > 1 && updateQuantity(product.id, product.quantity - 1)}>
                        <Text className="px-2 text-gray-700">-</Text>
                      </TouchableOpacity>
                      <Text>{product.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(product.id, product.quantity + 1)}>
                        <Text className="px-2 text-gray-700">+</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Remove item button */}
                    <TouchableOpacity onPress={() => removeFromCart(product.id)}>
                      <IonIcon name="close-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Subtotal and Total */}
              <View className="px-4 pt-2">
                <View className="flex-row justify-between items-center">
                  <Text>Subtotal</Text>
                  <Text>NGN {subtotal}.00</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Total</Text>
                  <Text>NGN {total}.00</Text>
                </View>

                {/* Cart and Checkout buttons */}
                <View className="flex-row gap-2 justify-between py-4">
                  <TouchableOpacity onPress={onClose} className="bg-white p-3 w-full rounded-md items-center">
                    <Text className="text-primary_color uppercase font-semibold">Continue shopping</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onClose} className="bg-primary_color p-3 w-full rounded-md items-center">
                    <Text className="text-white uppercase font-semibold">Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CartModal;
