import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuthContext } from '@/context/AuthContext';

const Login = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/menu');
    }
  }, [user, router]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handlePress = async(e:any) => {
    // Handle login logic here
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="light" backgroundColor="#16423C" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex items-center justify-center p-4 py-14">
          
          <View className="flex flex-col gap-2 rounded-xl p-4 border border-gray-300 w-full">
            <Text className="text-3xl font-bold mb-2 text-primary_color">Login</Text>
            
            <View className="flex flex-col gap-4">
              <TextInput
                className="w-full p-3 border border-gray-200 rounded-2xl"
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
              
              <View className="flex flex-row items-center relative">
                <TextInput
                  className="w-full p-3 border border-gray-200 rounded-2xl"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4"
                >
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={18}
                    color="#d1d5db"
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="flex-row justify-center items-center mt-2">
              <TouchableOpacity
                className="bg-primary_color p-4 w-full rounded-full"
                onPress={handlePress}
              >
                <Text className="font-bold text-secondary_color uppercase text-center">
                  Login with Email
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-col gap-2">
                {errorMessage && <Text className="p-2 w-full bg-red-300 text-red-500 border-[1px] border-red-500 text-[13px] rounded-md">{errorMessage}</Text>}
                {successMessage && <Text className="p-1 w-full bg-blue-300 text-blue-500 border-[1px] border-blue-500 text-[13px] rounded-md">{successMessage}</Text>}
            </View>
            
            <View className="flex-col gap-2">
              <Text className='text-[#444444]'></Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
