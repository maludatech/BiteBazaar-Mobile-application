import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { useAuthContext } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';

const RestorePassword = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user){
      router.push('/menu');
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  useEffect(() => setIsButtonEnabled(code.every((digit) => digit !== "")), [code]);

  const handleInputChange = (text: any, index:any) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) inputsRef.current[index + 1]?.focus();
    else if (!text && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e:any) => {
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    setCode(paste);
    const firstEmptyIndex = paste.findIndex((char:any) => char === "");
    inputsRef.current[firstEmptyIndex >= 0 ? firstEmptyIndex : 5]?.focus();
  };

  const handleContinue = async () => {
    setIsLoading(true);
    const restoreCode = code.join("");
    try {
      const response = await fetch("https://bitebazaer.vercel.app/api/user/restore-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: restoreCode }),
      });
      if (response.ok) {
        const { userId } = await response.json();
        router.replace(`/reset-password?userId=${userId}`);
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage("Internal server error");
      console.error("Error during fetch:", error);
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
          <Text className="text-3xl font-bold mb-2 text-primary_color">Restore Password</Text>
          <Text className="text-sm font-bold text-[#444444]">Enter the six-digit code sent to your email</Text>
          <View className="flex flex-row justify-center mt-4">
            {code.map((digit, index) => (
              <TextInput
                ref={(ref) => (inputsRef.current[index] = ref)}
                key={index}
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                className="w-10 h-10 mx-1 text-center border rounded text-black"
                style={{ fontSize: 24, borderColor: "#d0d0d0" }}
              />
            ))}
          </View>
          <View className="flex-row justify-center items-center mt-2">
            <TouchableOpacity className="bg-primary_color p-4 w-full rounded-full" onPress={handleContinue} disabled={!isButtonEnabled}>
              {isLoading ? <Spinner color={"#FFE5CF"}/> : <Text className="font-bold text-secondary_color uppercase text-center">Continue</Text>}
            </TouchableOpacity>
          </View>
          {errorMessage && <Text className="p-2 w-full bg-red-300 text-red-500 border border-red-500 text-[13px] rounded-full text-center">{errorMessage}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestorePassword;
