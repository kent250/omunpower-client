import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#0D453C' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />

            <View style={{ flex: 1, paddingHorizontal: 28, justifyContent: 'center', gap: 24 }}>

                {/* Logo */}
                <View style={{ alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ color: '#ECE8CD', fontSize: 32, fontWeight: '700', letterSpacing: -1 }}>
                        OmunPower
                    </Text>
                    <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14, marginTop: 4 }}>
                        Welcome back
                    </Text>
                </View>

                {/* Tab switcher */}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(236,232,205,0.08)',
                    borderRadius: 12, padding: 4,
                }}>
                    {(['email', 'phone'] as const).map((m) => (
                        <TouchableOpacity
                            key={m}
                            onPress={() => setMethod(m)}
                            style={{
                                flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
                                backgroundColor: method === m ? '#ECE8CD' : 'transparent',
                            }}>
                            <Text style={{
                                fontSize: 14, fontWeight: '500',
                                color: method === m ? '#0D453C' : 'rgba(236,232,205,0.5)',
                            }}>
                                {m === 'email' ? 'Email' : 'Phone'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Fields */}
                <View style={{ gap: 12 }}>
                    <View>
                        <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 13, marginBottom: 6 }}>
                            {method === 'email' ? 'Email address' : 'Phone number'}
                        </Text>
                        <TextInput
                            value={identifier}
                            onChangeText={setIdentifier}
                            placeholder={method === 'email' ? 'you@example.com' : '+250 7XX XXX XXX'}
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                            autoCapitalize="none"
                            style={{
                                backgroundColor: 'rgba(236,232,205,0.08)',
                                borderWidth: 0.5, borderColor: 'rgba(236,232,205,0.2)',
                                borderRadius: 12, padding: 14,
                                color: '#ECE8CD', fontSize: 15,
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 13, marginBottom: 6 }}>
                            Password
                        </Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            secureTextEntry
                            style={{
                                backgroundColor: 'rgba(236,232,205,0.08)',
                                borderWidth: 0.5, borderColor: 'rgba(236,232,205,0.2)',
                                borderRadius: 12, padding: 14,
                                color: '#ECE8CD', fontSize: 15,
                            }}
                        />
                    </View>

                    {/* Forgot password */}
                    <TouchableOpacity
                        onPress={() => router.push('/(auth)/reset-password' as any)}
                        style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 13 }}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Sign in button */}
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)' as any)}
                    style={{
                        backgroundColor: '#ECE8CD', borderRadius: 14,
                        paddingVertical: 16, alignItems: 'center',
                    }}>
                    <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600' }}>
                        Sign in
                    </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(236,232,205,0.15)' }} />
                    <Text style={{ color: 'rgba(236,232,205,0.3)', fontSize: 13 }}>or</Text>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: 'rgba(236,232,205,0.15)' }} />
                </View>

                {/* Sign up */}
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/register' as any)}
                    style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>
                        Don't have an account?{' '}
                        <Text style={{ color: '#ECE8CD', fontWeight: '500' }}>Sign up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}