import { Button, Footer } from '@/components/ui';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyOtp() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (value.length > 1) {
            // Handle paste — spread digits across inputs
            const digits = value.replace(/\D/g, '').slice(0, 6).split('');
            const newOtp = [...otp];
            digits.forEach((d, i) => {
                if (index + i < 6) newOtp[index + i] = d;
            });
            setOtp(newOtp);
            const nextIndex = Math.min(index + digits.length, 5);
            inputs.current[nextIndex]?.focus();
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < 6) {
            Alert.alert('Error', 'Please enter the full 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email: email!,
                token: code,
                type: 'signup',
            });
            if (error) throw error;
            router.replace('/(tabs)' as any);
        } catch (error: any) {
            Alert.alert('Verification failed', error.message);
            setOtp(['', '', '', '', '', '']);
            inputs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email!,
            });
            if (error) throw error;
            Alert.alert('Code sent!', 'A new code has been sent to your email.');
        } catch (error: any) {
            Alert.alert('Error', error.message);
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
                <View style={{ gap: theme.spacing['3xl'] }}>

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

                    {/* Header */}
                    <View style={{ gap: theme.spacing.md }}>
                        {/* Email icon */}
                        <View style={{
                            width: 72, height: 72, borderRadius: 36,
                            backgroundColor: theme.colors.creamSubtle,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1.5, borderColor: theme.colors.creamBorder,
                            marginBottom: theme.spacing.sm,
                        }}>
                            <Text style={{ fontSize: 32 }}>📧</Text>
                        </View>

                        <Text style={{
                            color: theme.colors.cream,
                            fontSize: theme.typography.sizes['3xl'],
                            fontWeight: theme.typography.weights.bold,
                        }}>
                            Check your email
                        </Text>
                        <Text style={{
                            color: theme.colors.creamMuted,
                            fontSize: theme.typography.sizes.md,
                            lineHeight: theme.typography.lineHeights.tight,
                        }}>
                            We sent a 6-digit code to{'\n'}
                            <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                {email}
                            </Text>
                        </Text>
                    </View>

                    {/* OTP inputs */}
                    <View style={{ flexDirection: 'row', gap: theme.spacing.sm, justifyContent: 'center' }}>
                        {otp.map((digit, i) => (
                            <TextInput
                                key={i}
                                ref={(ref) => { inputs.current[i] = ref; }}
                                value={digit}
                                onChangeText={(val) => handleChange(val, i)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                                keyboardType="number-pad"
                                maxLength={6}
                                selectTextOnFocus
                                style={{
                                    width: 48, height: 56,
                                    borderRadius: theme.radius.md,
                                    backgroundColor: digit ? theme.colors.cream : theme.colors.creamSubtle,
                                    borderWidth: 1,
                                    borderColor: digit ? theme.colors.cream : theme.colors.creamBorder,
                                    textAlign: 'center',
                                    fontSize: theme.typography.sizes['2xl'],
                                    fontWeight: theme.typography.weights.bold,
                                    color: digit ? theme.colors.primary : theme.colors.cream,
                                }}
                            />
                        ))}
                    </View>

                    <Button
                        label="Verify email"
                        onPress={handleVerify}
                        loading={loading}
                    />

                    {/* Resend */}
                    <TouchableOpacity onPress={handleResend} style={{ alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                            Didn't receive a code?{' '}
                            <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                Resend
                            </Text>
                        </Text>
                    </TouchableOpacity>

                </View>

                <Footer />
            </View>
        </KeyboardAvoidingView>
    );
}