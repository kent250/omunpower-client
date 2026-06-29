import { Button, Input, TabSwitcher } from '@/components/ui';
import { theme } from '@/constants/theme';
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
                    paddingVertical: theme.spacing['5xl'],
                    justifyContent: 'center',
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Logo */}
                <View style={{ alignItems: 'center', marginBottom: theme.spacing['3xl'] }}>
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

                {/* Tab switcher */}
                <View style={{ gap: theme.spacing.xl }}>
                    <TabSwitcher tabs={TABS} active={method} onChange={setMethod} />

                    <Input
                        label={method === 'email' ? 'Email address' : 'Phone number'}
                        value={identifier}
                        onChangeText={setIdentifier}
                        placeholder={method === 'email' ? 'you@example.com' : '+250 7XX XXX XXX'}
                        keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                        autoCapitalize="none"
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
                            <Text style={{
                                color: theme.colors.creamMuted,
                                fontSize: theme.typography.sizes.sm,
                            }}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button label="Sign in" onPress={() => router.replace('/(tabs)' as any)} />

                    {/* Divider */}
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}