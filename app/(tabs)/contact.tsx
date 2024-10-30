import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '@/context/AuthContext';
import Footer from '@/components/Footer';

interface Form {
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
}

const About = () => {
  const { user } = useAuthContext();
  const userId = user?.userId;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async () => {
    if (!userId) {
      setErrorMessage("User not authenticated.");
      return;
    }
  
    // Validation check for required fields
    if (!form.firstName || !form.lastName || !form.subject || !form.message) {
      setErrorMessage("All fields are required.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`https://bitebazaer.vercel.app/api/user/contact/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      });
  
      if (!response.ok) throw new Error('Failed to send message');
  
      setForm({ firstName: "", lastName: "", subject: "", message: "" });
      setSuccessMessage("Message sent successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
      setTimeout(() => router.push("/menu"), 5000);
    } catch (error) {
      console.error("Failed to send message", error);
      setErrorMessage("Failed to send message");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={{ backgroundColor: "#16423C", flex: 1 }}>
      <StatusBar backgroundColor="#16423C" style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex flex-col gap-4 pt-10 pb-2 font-rubik">
          <Text className="text-center font-bold text-4xl text-white uppercase">Contact</Text>
          <View className="flex flex-col gap-4 px-4">
            <Text className="font-bold text-lg flex items-center text-white">
              Name<Text className="text-red-500">*</Text>
            </Text>
            <View className="flex flex-row gap-2">
              <TextInput
                className="border-[1px] w-1/2 border-slate-400 bg-white rounded-sm p-2"
                placeholder="First name"
                value={form.firstName}
                onChangeText={(text) => setForm({ ...form, firstName: text })}
              />
              <TextInput
                className="border-[1px] w-1/2 border-slate-400 bg-white rounded-sm p-2"
                placeholder="Last name"
                value={form.lastName}
                onChangeText={(text) => setForm({ ...form, lastName: text })}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="font-bold text-lg text-white">Subject</Text>
              <TextInput
                className="border-[1px] w-full border-slate-400 bg-white rounded-sm p-2"
                placeholder=""
                value={form.subject}
                onChangeText={(text) => setForm({ ...form, subject: text })}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="font-bold text-lg text-white">Your Message</Text>
              <TextInput
                className="border-[1px] w-full border-slate-400 bg-white rounded-sm p-2"
                multiline
                numberOfLines={10}
                placeholder=""
                value={form.message}
                onChangeText={(text) => setForm({ ...form, message: text })}
              />
            </View>

            {errorMessage && (
              <Text className="w-full p-2 mt-2 text-sm text-red-500 text-center bg-red-300 border-red-500 border-[1px] rounded-md">
                {errorMessage}
              </Text>
            )}

            {successMessage && (
              <Text className="w-full p-2 text-sm mt-2 text-center text-blue-500 bg-blue-300 border-blue-500 border-[1px] rounded-md">
                {successMessage}
              </Text>
            )}

            <TouchableOpacity
              className="rounded-md bg-blue-500 p-3 w-full"
              disabled={isLoading}
              onPress={handleSubmit}
            >
              <Text className="text-white text-center">{isLoading ? "Sending..." : "Send Message"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
