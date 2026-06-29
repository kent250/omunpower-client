import { Button, Input, ScreenHeader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const CONTACT_OPTIONS: { icon: IconName; label: string; value: string }[] = [
    { icon: 'mail-outline', label: 'Email us', value: 'support@omunpower.rw' },
    { icon: 'call-outline', label: 'Call us', value: '+250 788 000 000' },
    { icon: 'logo-whatsapp', label: 'WhatsApp', value: '+250 788 000 000' },
];

export default function ContactSupport() {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <ScreenHeader title="Contact support" />

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* Contact options */}
                <Text style={{
                    color: theme.colors.creamMuted,
                    fontSize: theme.typography.sizes.xs,
                    fontWeight: theme.typography.weights.semibold,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    paddingHorizontal: theme.spacing.sm,
                }}>
                    Reach us directly
                </Text>

                <View style={{ gap: theme.spacing.sm }}>
                    {CONTACT_OPTIONS.map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            style={{
                                flexDirection: 'row', alignItems: 'center',
                                backgroundColor: theme.colors.creamSubtle,
                                borderWidth: 0.5, borderColor: theme.colors.creamBorder,
                                borderRadius: theme.radius.xl,
                                padding: theme.spacing.lg,
                            }}>
                            <View style={{
                                width: 36, height: 36, borderRadius: theme.radius.sm,
                                backgroundColor: 'rgba(236,232,205,0.15)',
                                alignItems: 'center', justifyContent: 'center',
                                marginRight: theme.spacing.md,
                            }}>
                                <Ionicons name={option.icon} size={18} color={theme.colors.cream} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    fontSize: theme.typography.sizes.md,
                                    fontWeight: theme.typography.weights.medium,
                                    color: theme.colors.cream,
                                }}>
                                    {option.label}
                                </Text>
                                <Text style={{ fontSize: theme.typography.sizes.xs, color: theme.colors.creamMuted, marginTop: 2 }}>
                                    {option.value}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={theme.colors.creamBorder} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Send message form */}
                <Text style={{
                    color: theme.colors.creamMuted,
                    fontSize: theme.typography.sizes.xs,
                    fontWeight: theme.typography.weights.semibold,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    paddingHorizontal: theme.spacing.sm,
                }}>
                    Send a message
                </Text>

                <View style={{ gap: theme.spacing.xl }}>
                    <Input
                        label="Subject"
                        value={subject}
                        onChangeText={setSubject}
                        placeholder="What's your issue about?"
                    />

                    {/* Message textarea — fully green themed */}
                    <View>
                        <Text style={{
                            color: theme.colors.creamMuted,
                            fontSize: theme.typography.sizes.sm,
                            marginBottom: theme.spacing.xs,
                        }}>
                            Message
                        </Text>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Describe your issue in detail..."
                            placeholderTextColor={theme.colors.creamBorder}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                            style={{
                                backgroundColor: theme.colors.creamSubtle,
                                borderWidth: 0.5,
                                borderColor: theme.colors.creamBorder,
                                borderRadius: theme.radius.md,
                                padding: theme.spacing.lg,
                                color: theme.colors.cream,
                                fontSize: theme.typography.sizes.base,
                                minHeight: 130,
                            }}
                        />
                    </View>
                </View>

                <Button label="Send message" onPress={() => router.back()} />

            </ScrollView>
        </SafeAreaView>
    );
}