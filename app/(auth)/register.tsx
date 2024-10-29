import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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


const Login = () => {
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    if (user){
      router.push('/menu');
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    billingAddress: "",
    phoneNumber: "",
  });

  const validateForm = () => {
    const { email, password, confirmPassword, fullName, billingAddress, phoneNumber } = formData;

    if (!email || !password || !fullName || !billingAddress || !phoneNumber) {
      return "All fields are required.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleRegister = async () => {
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://bitebazaer.vercel.app/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || 'Failed to sign up');
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }

      router.push("/menu");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Something went wrong. Please try again.");
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
          
          <Text className="text-3xl font-bold mb-2 text-primary_color">Sign Up</Text>
          
          <View className="flex flex-col gap-4">
            <TextInput
              className="w-full p-3 border border-gray-200 rounded-2xl"
              placeholder="Email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <TextInput
              className="w-full p-3 border border-gray-200 rounded-2xl"
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />

            <TextInput
              className="w-full p-3 border border-gray-200 rounded-2xl"
              placeholder="Billing Address"
              value={formData.billingAddress}
              onChangeText={(text) => setFormData({ ...formData, billingAddress: text })}
            />
            
            <TextInput
              className="w-full p-3 border border-gray-200 rounded-2xl"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
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

            <View className="flex flex-row items-center relative">
              <TextInput
                className="w-full p-3 border border-gray-200 rounded-2xl"
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4"
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye-slash" : "eye"}
                  size={18}
                  color="#d1d5db"
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row justify-center items-center mt-2">
            <TouchableOpacity
              className="bg-primary_color p-4 w-full rounded-full"
              onPress={handleRegister}
            >
              {isLoading ? <Spinner color={"#FFE5CF"}/> : <Text className="font-bold text-secondary_color uppercase text-center">Sign Up with Email </Text>}
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2">
            {errorMessage && <Text className="p-2 w-full bg-red-300 text-red-500 border border-red-500 text-[13px] rounded-full text-center">{errorMessage}</Text>}
            {successMessage && <Text className="p-1 w-full bg-blue-300 text-blue-500 border border-blue-500 text-[13px] rounded-full text-center">{successMessage}</Text>}
          </View>

          <View className="text-center justify-center mt-2 text-[13px] flex flex-col gap-1 text-slate-500">
            <Text>By creating an account, you automatically accept our</Text>
            <Text>
              <Link href={"https://bitebazaer.vercel.app/terms-of-service"} className="underline hover:underline-offset-2">Terms of Service</Link>,
              <Link href={"https://bitebazaer.vercel.app/privacy-policy"} className="underline hover:underline-offset-2">Privacy Policy</Link>,&
              <Link href={"https://bitebazaer.vercel.app/cookie-policy"} className="underline hover:underline-offset-2">Cookie Policy</Link>.
            </Text>
          </View>

          <View className="text-center justify-center text-sm flex flex-col text-slate-500 mt-2">
          <Text>Already have an account: <Link href={"/login"} className='underline hover:underline-offset-4'>Login</Link></Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
