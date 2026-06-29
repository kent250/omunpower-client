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

export default function Register() {
    const [method, setMethod] = useState('email');
    const [fullName, setFullName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.colors.primary }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: theme.spacing['3xl'],
                    paddingVertical: theme.spacing['5xl'],
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                {/* Back */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        width: 40, height: 40, borderRadius: theme.radius.md,
                        backgroundColor: theme.colors.creamSubtle,
                        alignItems: 'center', justifyContent: 'center',
                        marginBottom: theme.spacing['3xl'],
                    }}>
                    <Text style={{ color: theme.colors.cream, fontSize: 20 }}>←</Text>
                </TouchableOpacity>

                {/* Header */}
                <View style={{ marginBottom: theme.spacing['3xl'], gap: theme.spacing.sm }}>
                    <Text style={{
                        color: theme.colors.cream,
                        fontSize: theme.typography.sizes['3xl'],
                        fontWeight: theme.typography.weights.bold,
                    }}>
                        Create account
                    </Text>
                    <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                        Start monitoring your energy today
                    </Text>
                </View>

                <View style={{ gap: theme.spacing.xl }}>
                    <TabSwitcher tabs={TABS} active={method} onChange={setMethod} />

                    <Input
                        label="Full name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Jean-Paul Uwimana"
                    />

                    <Input
                        label={method === 'email' ? 'Email address' : 'Phone number'}
                        value={identifier}
                        onChangeText={setIdentifier}
                        placeholder={method === 'email' ? 'you@example.com' : '+250 7XX XXX XXX'}
                        keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                        autoCapitalize="none"
                    />

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Input
                        label="Confirm password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Button
                        label="Create account"
                        onPress={() => router.replace('/(tabs)' as any)}
                    />

                    <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                            Already have an account?{' '}
                            <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                Sign in
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}