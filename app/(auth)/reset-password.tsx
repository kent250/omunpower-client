import { Button, Footer, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function ResetPassword() {
    const [identifier, setIdentifier] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!identifier.trim()) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(
                identifier.trim(),
                { redirectTo: 'omunpower://reset-password' }
            );
            if (error) throw error;
            setSent(true);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: theme.colors.primary }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />

            <View style={{
                flex: 1,
                paddingHorizontal: theme.spacing['3xl'],
                paddingVertical: theme.spacing['5xl'],
                justifyContent: 'space-between',
            }}>

                <View style={{ gap: theme.spacing['2xl'] }}>
                    {/* Back */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{
                            width: 40, height: 40, borderRadius: theme.radius.md,
                            backgroundColor: theme.colors.creamSubtle,
                            alignItems: 'center', justifyContent: 'center',
                            alignSelf: 'flex-start',
                        }}>
                        <Text style={{ color: theme.colors.cream, fontSize: 20 }}>←</Text>
                    </TouchableOpacity>

                    {!sent ? (
                        <View style={{ gap: theme.spacing['2xl'] }}>
                            <View style={{ gap: theme.spacing.sm }}>
                                <Text style={{
                                    color: theme.colors.cream,
                                    fontSize: theme.typography.sizes['3xl'],
                                    fontWeight: theme.typography.weights.bold,
                                }}>
                                    Reset password
                                </Text>
                                <Text style={{
                                    color: theme.colors.creamMuted,
                                    fontSize: theme.typography.sizes.md,
                                    lineHeight: theme.typography.lineHeights.tight,
                                }}>
                                    Enter your email address and we'll send you a reset link.
                                </Text>
                            </View>

                            <Input
                                label="Email address"
                                value={identifier}
                                onChangeText={setIdentifier}
                                placeholder="you@example.com"
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />

                            <Button label="Send reset link" onPress={handleSend} loading={loading} />

                            <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
                                <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                                    Back to{' '}
                                    <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                        Sign in
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', gap: theme.spacing.lg, marginTop: theme.spacing['5xl'] }}>
                            <View style={{
                                width: 80, height: 80, borderRadius: theme.radius['2xl'],
                                backgroundColor: theme.colors.creamSubtle,
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Text style={{ fontSize: 36 }}>📬</Text>
                            </View>
                            <Text style={{
                                color: theme.colors.cream,
                                fontSize: theme.typography.sizes['2xl'],
                                fontWeight: theme.typography.weights.bold,
                                textAlign: 'center',
                            }}>
                                Check your inbox
                            </Text>
                            <Text style={{
                                color: theme.colors.creamMuted,
                                fontSize: theme.typography.sizes.md,
                                textAlign: 'center',
                                lineHeight: theme.typography.lineHeights.tight,
                            }}>
                                We sent a reset link to {identifier}.
                            </Text>

                            <Button
                                label="Back to sign in"
                                onPress={() => router.replace('/(auth)/login' as any)}
                            />
                        </View>
                    )}
                </View>

                <Footer />
            </View>
        </KeyboardAvoidingView>
    );
}