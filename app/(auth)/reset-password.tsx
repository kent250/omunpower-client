import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ResetPassword() {
    const [identifier, setIdentifier] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (identifier.trim()) {
            setSent(true);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#0D453C' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />

            <View style={{ flex: 1, paddingHorizontal: 28, justifyContent: 'center', gap: 24 }}>

                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        position: 'absolute', top: 60, left: 28,
                        width: 40, height: 40, borderRadius: 12,
                        backgroundColor: 'rgba(236,232,205,0.08)',
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Text style={{ color: '#ECE8CD', fontSize: 20 }}>←</Text>
                </TouchableOpacity>

                {!sent ? (
                    <>
                        {/* Header */}
                        <View style={{ gap: 8 }}>
                            <Text style={{ color: '#ECE8CD', fontSize: 28, fontWeight: '700' }}>
                                Reset password
                            </Text>
                            <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14, lineHeight: 22 }}>
                                Enter the email or phone number linked to your account. We'll send you a reset link.
                            </Text>
                        </View>

                        {/* Input */}
                        <View>
                            <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 13, marginBottom: 6 }}>
                                Email or phone number
                            </Text>
                            <TextInput
                                value={identifier}
                                onChangeText={setIdentifier}
                                placeholder="you@example.com"
                                placeholderTextColor="rgba(236,232,205,0.25)"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={{
                                    backgroundColor: 'rgba(236,232,205,0.08)',
                                    borderWidth: 0.5, borderColor: 'rgba(236,232,205,0.2)',
                                    borderRadius: 12, padding: 14,
                                    color: '#ECE8CD', fontSize: 15,
                                }}
                            />
                        </View>

                        {/* Send button */}
                        <TouchableOpacity
                            onPress={handleSend}
                            style={{
                                backgroundColor: '#ECE8CD', borderRadius: 14,
                                paddingVertical: 16, alignItems: 'center',
                            }}>
                            <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600' }}>
                                Send reset link
                            </Text>
                        </TouchableOpacity>

                        {/* Back to login */}
                        <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>
                                Back to <Text style={{ color: '#ECE8CD', fontWeight: '500' }}>Sign in</Text>
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        {/* Success state */}
                        <View style={{ alignItems: 'center', gap: 16 }}>
                            <View style={{
                                width: 80, height: 80, borderRadius: 24,
                                backgroundColor: 'rgba(236,232,205,0.1)',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Text style={{ fontSize: 36 }}>📬</Text>
                            </View>
                            <Text style={{ color: '#ECE8CD', fontSize: 24, fontWeight: '700', textAlign: 'center' }}>
                                Check your inbox
                            </Text>
                            <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14, textAlign: 'center', lineHeight: 22 }}>
                                We sent a reset link to {identifier}. Check your email and follow the instructions.
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.replace('/(auth)/login' as any)}
                            style={{
                                backgroundColor: '#ECE8CD', borderRadius: 14,
                                paddingVertical: 16, alignItems: 'center',
                            }}>
                            <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600' }}>
                                Back to sign in
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}