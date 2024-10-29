import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useAuthContext } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';
interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  billingAddress: string;
  registrationDate: string;
  }

  interface CustomJwtPayload extends JwtPayload {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    billingAddress: string;
    registrationDate: string;
  }

const Login = () => {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (user){
      router.push('/menu');
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const decodeJwtToken = (token: string): CustomJwtPayload | null => {
    try {
        const decoded: CustomJwtPayload = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token: ", error);
        return null;
    }
  };

  const handlePress = async() => {
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in both email and password.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setTimeout(() => setErrorMessage(""),3000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://bitebazaer.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      // Handle errors returned by the backend
      const result = await response.json();
      if (!response.ok) {
        // Display the error message from the backend
        setErrorMessage(result.message || 'Failed to sign in');
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
  
      // If successful, handle login
      const { token, registrationDate } = result;
      const decodedToken: CustomJwtPayload | null = decodeJwtToken(token);
      const user: User = {
        userId: decodedToken?.userId || "", 
        fullName: decodedToken?.fullName || "", 
        email: decodedToken?.email || "", 
        phoneNumber: decodedToken?.phoneNumber || "", 
        billingAddress: decodedToken?.billingAddress || "", 
        registrationDate,
      };    
  
      dispatch({ type: "LOGIN", payload: user });
      router.push("/menu");
  
    } catch (error: any) {
      // Fallback error message in case of network or other issues
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Error during sign-in:", error);
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#16423C", flex: 1 }}>
      <StatusBar style="light" backgroundColor="#16423C" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View className="w-11/12 max-w-md flex flex-col gap-2 rounded-xl p-5 border bg-white border-gray-300">
          
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
              {isLoading ? <Spinner color={"#FFE5CF"}/> : <Text className="font-bold text-secondary_color uppercase text-center">Login with Email </Text>}
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2">
            {errorMessage && <Text className="p-2 w-full bg-red-300 text-red-500 border border-red-500 text-[13px] rounded-full text-center">{errorMessage}</Text>}
            {successMessage && <Text className="p-1 w-full bg-blue-300 text-blue-500 border border-blue-500 text-[13px] rounded-full text-center">{successMessage}</Text>}
          </View>

          <View className="flex-col gap-2 pl-2">
            <Link href={"/forgot-password"} className="text-[#444444] underline">Forgotten Password</Link>
            <Text className="text-[#444444]">
              Don't have an account: <Link href={"/register"} className="underline">Create Account</Link>
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
