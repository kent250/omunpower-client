import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Register() {
    const [method, setMethod] = useState<'email' | 'phone'>('email');
    const [fullName, setFullName] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const inputStyle = {
        backgroundColor: 'rgba(236,232,205,0.08)',
        borderWidth: 0.5,
        borderColor: 'rgba(236,232,205,0.2)',
        borderRadius: 12,
        padding: 14,
        color: '#ECE8CD',
        fontSize: 15,
    };

    const labelStyle = {
        color: 'rgba(236,232,205,0.6)' as const,
        fontSize: 13,
        marginBottom: 6,
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#0D453C' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar style="light" />

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 28, paddingVertical: 60 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        width: 40, height: 40, borderRadius: 12,
                        backgroundColor: 'rgba(236,232,205,0.08)',
                        alignItems: 'center', justifyContent: 'center',
                        marginBottom: 32,
                    }}>
                    <Text style={{ color: '#ECE8CD', fontSize: 20 }}>←</Text>
                </TouchableOpacity>

                {/* Header */}
                <View style={{ marginBottom: 32, gap: 6 }}>
                    <Text style={{ color: '#ECE8CD', fontSize: 28, fontWeight: '700' }}>
                        Create account
                    </Text>
                    <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>
                        Start monitoring your energy today
                    </Text>
                </View>

                {/* Tab switcher */}
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgba(236,232,205,0.08)',
                    borderRadius: 12, padding: 4,
                    marginBottom: 20,
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
                <View style={{ gap: 16 }}>

                    {/* Full name */}
                    <View>
                        <Text style={labelStyle}>Full name</Text>
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Jean-Paul Uwimana"
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            style={inputStyle}
                        />
                    </View>

                    {/* Email or Phone */}
                    <View>
                        <Text style={labelStyle}>
                            {method === 'email' ? 'Email address' : 'Phone number'}
                        </Text>
                        <TextInput
                            value={identifier}
                            onChangeText={setIdentifier}
                            placeholder={method === 'email' ? 'you@example.com' : '+250 7XX XXX XXX'}
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
                            autoCapitalize="none"
                            style={inputStyle}
                        />
                    </View>

                    {/* Password */}
                    <View>
                        <Text style={labelStyle}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            secureTextEntry
                            style={inputStyle}
                        />
                    </View>

                    {/* Confirm password */}
                    <View>
                        <Text style={labelStyle}>Confirm password</Text>
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="••••••••"
                            placeholderTextColor="rgba(236,232,205,0.25)"
                            secureTextEntry
                            style={inputStyle}
                        />
                    </View>

                </View>

                {/* Register button */}
                <TouchableOpacity
                    onPress={() => router.replace('/(tabs)' as any)}
                    style={{
                        backgroundColor: '#ECE8CD', borderRadius: 14,
                        paddingVertical: 16, alignItems: 'center',
                        marginTop: 28,
                    }}>
                    <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600' }}>
                        Create account
                    </Text>
                </TouchableOpacity>

                {/* Sign in link */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>
                        Already have an account?{' '}
                        <Text style={{ color: '#ECE8CD', fontWeight: '500' }}>Sign in</Text>
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}