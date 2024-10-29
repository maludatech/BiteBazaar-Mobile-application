import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuthContext } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

const ResetPassword = () => {
  const { user} = useAuthContext();

  useEffect(() => {
    if (user){
      router.push('/menu');
    }
  }, [user]);

  const { userId } = useLocalSearchParams();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async () => {
    setIsLoading(true);

    if(!newPassword || !confirmPassword){
      setErrorMessage("All fields are required")
      setIsLoading(false);
      return
    }

    if (newPassword.length < 8 || newPassword.length > 15) {
      setErrorMessage("Password must be between 8 and 15 characters.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(""), 3000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://bitebazaer.vercel.app/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newPassword }),
      });

      if (response.ok) {
        setSuccessMessage("Password reset successfully");
        setTimeout(() => {
          setSuccessMessage("");
          router.replace("/login");
        }, 3000);
      } else {
        const result = await response.json();
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage("Internal Server Error");
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
          
          <Text className="text-3xl font-bold mb-2 text-primary_color">Reset Password</Text>
          
          <View className="flex flex-row items-center relative">
              <TextInput
                className="w-full p-3 border border-gray-200 rounded-2xl"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
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
                secureTextEntry={!showPassword2}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword2(!showPassword2)}
                className="absolute right-4"
              >
                <FontAwesome
                  name={showPassword2 ? "eye-slash" : "eye"}
                  size={18}
                  color="#d1d5db"
                />
              </TouchableOpacity>
            </View>
          
          <View className="flex-row justify-center items-center mt-2">
            <TouchableOpacity
              className="bg-primary_color p-4 w-full rounded-full"
              onPress={handleSubmit}
            >
              {isLoading ? <Spinner color={"#FFE5CF"}/> : <Text className="font-bold text-secondary_color uppercase text-center">Reset password</Text>}
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

export default ResetPassword;
