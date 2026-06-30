import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePassword() {
    const { user } = useAuth();
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const fullName = user?.user_metadata?.full_name || 'OmunPower user';
    const email = user?.email || user?.user_metadata?.phone_number || '';

    const handleUpdate = async () => {
        if (!current.trim() || !newPass.trim() || !confirm.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (newPass.length < 8) {
            Alert.alert('Error', 'New password must be at least 8 characters');
            return;
        }
        if (newPass !== confirm) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPass.trim(),
                current_password: current.trim(),
            });
            if (error) throw error;

            Alert.alert('Success', 'Your password has been updated.', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                paddingHorizontal: theme.spacing.xl,
                paddingBottom: theme.spacing.xl,
                gap: theme.spacing.md,
            }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        width: 40, height: 40, borderRadius: theme.radius.md,
                        backgroundColor: theme.colors.creamSubtle,
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Ionicons name="arrow-back" size={20} color={theme.colors.cream} />
                </TouchableOpacity>
                <Text style={{
                    color: theme.colors.cream,
                    fontSize: theme.typography.sizes.xl,
                    fontWeight: theme.typography.weights.semibold,
                }}>
                    Change password
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* Avatar — not editable */}
                <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
                    <View style={{
                        width: 88, height: 88, borderRadius: 44,
                        backgroundColor: theme.colors.creamSubtle,
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth: 2, borderColor: theme.colors.creamBorder,
                    }}>
                        <Ionicons name="person" size={44} color={theme.colors.cream} />
                    </View>
                    <Text style={{
                        color: theme.colors.cream,
                        fontSize: theme.typography.sizes.lg,
                        fontWeight: theme.typography.weights.semibold,
                        marginTop: theme.spacing.md,
                    }}>
                        {fullName}
                    </Text>
                    <Text style={{
                        color: theme.colors.creamMuted,
                        fontSize: theme.typography.sizes.sm,
                        marginTop: 2,
                    }}>
                        {email}
                    </Text>
                </View>

                {/* Info box */}
                <View style={{
                    backgroundColor: theme.colors.creamSubtle,
                    borderRadius: theme.radius.xl,
                    padding: theme.spacing.lg,
                    flexDirection: 'row', gap: theme.spacing.md, alignItems: 'flex-start',
                    borderWidth: 0.5, borderColor: theme.colors.creamBorder,
                }}>
                    <Ionicons name="information-circle-outline" size={20} color={theme.colors.cream} />
                    <Text style={{
                        flex: 1,
                        color: theme.colors.creamMuted,
                        fontSize: theme.typography.sizes.sm,
                        lineHeight: theme.typography.lineHeights.tight,
                    }}>
                        Your password must be at least 8 characters and include a number and a special character.
                    </Text>
                </View>

                {/* Fields */}
                <View style={{ gap: theme.spacing.xl }}>
                    <Input
                        label="Current password"
                        value={current}
                        onChangeText={setCurrent}
                        placeholder="••••••••"
                        secureTextEntry
                    />
                    <Input
                        label="New password"
                        value={newPass}
                        onChangeText={setNewPass}
                        placeholder="••••••••"
                        secureTextEntry
                    />
                    <Input
                        label="Confirm new password"
                        value={confirm}
                        onChangeText={setConfirm}
                        placeholder="••••••••"
                        secureTextEntry
                    />
                </View>

                <Button label="Update password" onPress={handleUpdate} loading={loading} />

            </ScrollView>
        </SafeAreaView>
    );
}