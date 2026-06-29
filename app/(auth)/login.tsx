import { Button, Footer, Input, TabSwitcher } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const TABS = [
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
];

export default function Login() {
    const [method, setMethod] = useState('email');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.colors.primary }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: theme.spacing['3xl'],
                    paddingTop: theme.spacing['5xl'],
                    paddingBottom: theme.spacing['3xl'],
                    flexGrow: 1,
                    justifyContent: 'space-between',
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Main content */}
                <View style={{ gap: theme.spacing.xl }}>

                    {/* Avatar + Logo */}
                    <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg, gap: theme.spacing.lg }}>
                        <View style={{
                            width: 72, height: 72, borderRadius: 36,
                            backgroundColor: theme.colors.creamSubtle,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1.5, borderColor: theme.colors.creamBorder,
                        }}>
                            <Ionicons name="person" size={36} color={theme.colors.cream} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                color: theme.colors.cream,
                                fontSize: theme.typography.sizes['4xl'],
                                fontWeight: theme.typography.weights.bold,
                                letterSpacing: -1,
                            }}>
                                OmunPower
                            </Text>
                            <Text style={{
                                color: theme.colors.creamMuted,
                                fontSize: theme.typography.sizes.md,
                                marginTop: theme.spacing.xs,
                            }}>
                                Welcome back
                            </Text>
                        </View>
                    </View>

                    <TabSwitcher tabs={TABS} active={method} onChange={setMethod} />

                    <Input
                        label={method === 'email' ? 'Email address' : 'Phone number'}
                        value={identifier}
                        onChangeText={setIdentifier}
                        placeholder={method === 'email' ? 'you@example.com' : '7XX XXX XXX'}
                        keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                        autoCapitalize="none"
                        prefix={method === 'phone' ? '🇷🇼 +250' : undefined}
                    />

                    <View>
                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            secureTextEntry
                        />
                        <TouchableOpacity
                            onPress={() => router.push('/(auth)/reset-password' as any)}
                            style={{ alignSelf: 'flex-end', marginTop: theme.spacing.sm }}>
                            <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.sm }}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button label="Sign in" onPress={() => router.replace('/(tabs)' as any)} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                        <View style={{ flex: 1, height: 0.5, backgroundColor: theme.colors.creamBorder }} />
                        <Text style={{ color: theme.colors.creamBorder, fontSize: theme.typography.sizes.sm }}>or</Text>
                        <View style={{ flex: 1, height: 0.5, backgroundColor: theme.colors.creamBorder }} />
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/register' as any)}
                        style={{ alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                            Don't have an account?{' '}
                            <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                Sign up
                            </Text>
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Footer pinned to bottom */}
                <Footer />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}