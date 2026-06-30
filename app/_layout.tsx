import { AuthProvider, useAuth } from '@/context/auth';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootLayoutNav() {
  const { session, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (session) {
      router.replace('/(tabs)' as any);
    } else {
      router.replace('/(onboarding)' as any);
    }
  }, [session, loading]);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 300,
        }}>
        <Stack.Screen name="(onboarding)/index" />
        <Stack.Screen name="(auth)" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      </Stack>
      <StatusBar style="light" backgroundColor={`#0D453C`} />
    </SafeAreaProvider>
  );
}



export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
        <StatusBar style="light" backgroundColor="#0D453C" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}