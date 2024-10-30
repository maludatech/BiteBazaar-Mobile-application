import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useEffect} from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ProductList from '@/components/ProductList';
import { useAuthContext } from '@/context/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}


const Menu = () => {
  const {user} = useAuthContext();

  useEffect(() => {
      if (!user){
        router.push('/login');
      }
  }, [user]);
  const renderProduct = ({ item }: {item: Product}) => (
    <View className='p-4 items-center flex flex-col gap-2'>
      <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 200, borderRadius: 8 }} />
      <Text className='font-bold mt-5 text-white text-xl'>{item.name}</Text>
      <Text className='font-medium text-white text-lg'>{`₦${item.price}`}</Text>
      <TouchableOpacity className='bg-secondary_color p-3 rounded-md mt-2'>
            <Text className='text-primary_color uppercase font-bold'>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#16423C", flex: 1 }}>
      <StatusBar backgroundColor="#16423C" style="light" />
      <View className='flex flex-col gap-2 py-10'>
        <Text className='text-center font-bold text-4xl text-white uppercase'>Shop</Text>
        <FlatList
          data={ProductList}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Menu;
