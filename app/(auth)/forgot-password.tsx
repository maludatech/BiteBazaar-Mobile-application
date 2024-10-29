import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuthContext } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

const ForgottenPassword = () => {
  const { user} = useAuthContext();

  useEffect(() => {
    if (user){
      router.push('/menu');
    }
  }, [user]);

  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleForgottenPassword = async () => {
    setIsLoading(true);

    if(!email){
      setErrorMessage("Please fill in your email");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
        const response = await fetch("https://bitebazaer.vercel.app/api/user/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email}),
        });
  
        const result = await response.json();
        if (!response.ok) {
          setErrorMessage(result.message || "An error occurred");
          setTimeout(() => setErrorMessage(""), 3000);
        } else {
          setSuccessMessage(result.message || "Password reset email sent!");
          setTimeout(() => setSuccessMessage(""), 3000);
          router.replace("/restore-password");
        }
      } catch (error) {
        setErrorMessage("An error occurred");
        setTimeout(() => setErrorMessage(""), 3000);
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#16423C", flex: 1 }}>
      <StatusBar style="light" backgroundColor="#16423C" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View className="w-11/12 max-w-md flex flex-col gap-2 rounded-xl p-5 border bg-white border-gray-300">
          
          <Text className="text-3xl font-bold mb-2 text-primary_color">Forgot Password</Text>
          <Text className='text-[#444444] text-[13px]'>Enter your email address, and we'll send you instructions on how to reset your password. Please check your inbox for the email, and if you don't see it, be sure to look in your spam or junk folder.</Text>
          
          <View className="flex flex-col gap-4">
            <TextInput
              className="w-full p-3 border border-gray-200 rounded-2xl"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          
          <View className="flex-row justify-center items-center mt-2">
            <TouchableOpacity
              className="bg-primary_color p-4 w-full rounded-full"
              onPress={handleForgottenPassword}
            >
              {isLoading ? <Spinner color={"#FFE5CF"}/> : <Text className="font-bold text-secondary_color uppercase text-center">Send</Text>}
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2">
            {errorMessage && <Text className="p-2 w-full bg-red-300 text-red-500 border border-red-500 text-[13px] rounded-full text-center">{errorMessage}</Text>}
            {successMessage && <Text className="p-1 w-full bg-blue-300 text-blue-500 border border-blue-500 text-[13px] rounded-full text-center">{successMessage}</Text>}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgottenPassword;
