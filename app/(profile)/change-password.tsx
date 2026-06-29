import { Button, Input, ScreenHeader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePassword() {
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <ScreenHeader title="Change password" />

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
                        Jean-Paul Uwimana
                    </Text>
                    <Text style={{
                        color: theme.colors.creamMuted,
                        fontSize: theme.typography.sizes.sm,
                        marginTop: 2,
                    }}>
                        jeanpaul@example.com
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

                <Button label="Update password" onPress={() => router.back()} />

            </ScrollView>
        </SafeAreaView>
    );
}