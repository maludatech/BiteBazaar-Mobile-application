import { Stack } from "expo-router";

const AuthLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="register" options={{headerShown: false}}/>
            <Stack.Screen name="login" options={{headerShown: false}}/>
            <Stack.Screen name="forgot-password" options={{headerShown: false}}/>
            <Stack.Screen name="restore-password" options={{headerShown: false}}/>
            <Stack.Screen name="reset-password" options={{headerShown: false}}/>
        </Stack>
    )
}

export default AuthLayout;