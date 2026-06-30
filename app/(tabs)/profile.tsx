import { theme } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ProfileMenuItem {
    icon: IconName;
    label: string;
    sublabel?: string;
    onPress: () => void;
    danger?: boolean;
}


export default function ProfileScreen() {
    const { signOut, user, loading } = useAuth();

    const fullName = user?.user_metadata?.full_name;
    const email = user?.email || user?.user_metadata?.phone_number || 'No contact on file';


    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
                <StatusBar style="light" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={theme.colors.cream} />
                </View>
            </SafeAreaView>
        );
    }


    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete account',
            'This will permanently delete your account and all associated data. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { data: { session } } = await supabase.auth.getSession();

                            const { error } = await supabase.functions.invoke('delete-account', {
                                headers: { Authorization: `Bearer ${session?.access_token}` },
                            });

                            if (error) throw error;

                            await signOut();
                            router.replace('/(auth)/login' as any);
                        } catch (error: any) {
                            Alert.alert('Error', error.message);
                        }
                    },
                },
            ]
        );
    };


    const MENU_SECTIONS: { title: string; items: ProfileMenuItem[] }[] = [
        {
            title: 'Account',
            items: [
                {
                    icon: 'person-outline',
                    label: 'Edit profile',
                    sublabel: 'Name, email, phone number',
                    onPress: () => router.push('/(profile)/edit-profile' as any),
                },
                {
                    icon: 'lock-closed-outline',
                    label: 'Change password',
                    sublabel: 'Update your password',
                    onPress: () => router.push('/(profile)/change-password' as any),
                },
            ],
        },
        {
            title: 'My Home',
            items: [
                {
                    icon: 'home-outline',
                    label: 'Home address',
                    sublabel: 'Province, sector, cell, village',
                    onPress: () => router.push('/(profile)/home-address' as any),
                },
            ],
        },
        {
            title: 'Support',
            items: [
                {
                    icon: 'help-circle-outline',
                    label: 'Help & FAQ',
                    sublabel: 'Find answers to your questions',
                    onPress: () => router.push('/(profile)/help-faqs' as any),
                },
                {
                    icon: 'chatbubble-outline',
                    label: 'Contact support',
                    sublabel: 'Get help from our support team',
                    onPress: () => router.push('/(profile)/contact-support' as any),
                },
            ],
        },
        {
            title: '',
            items: [
                {
                    icon: 'log-out-outline',
                    label: 'Sign out',
                    sublabel: 'Sign out of your account',
                    onPress: async () => {
                        await signOut();
                        router.replace('/(auth)/login' as any);
                    },
                    danger: true,
                },
                {
                    icon: 'trash-outline',
                    label: 'Delete account',
                    sublabel: 'Permanently delete your account and data',
                    onPress: handleDeleteAccount,
                    danger: true,
                },
            ],
        },
    ];




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: theme.spacing['2xl'],
                paddingBottom: theme.spacing['2xl'],
            }}>
                <Text style={{
                    color: theme.colors.cream,
                    fontSize: theme.typography.sizes['2xl'],
                    fontWeight: theme.typography.weights.semibold,
                }}>
                    Profile
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.cream }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}>

                {/* Fixes pull-down bounce */}
                <View style={{
                    position: 'absolute', top: -300, left: 0, right: 0, height: 300,
                    backgroundColor: theme.colors.primary,
                }} />

                {/* Avatar section */}
                <View style={{
                    backgroundColor: theme.colors.primary,
                    paddingHorizontal: theme.spacing['2xl'],
                    paddingBottom: theme.spacing['3xl'],
                    alignItems: 'center',
                    gap: theme.spacing.md,
                }}>
                    {/* Avatar */}
                    <View style={{
                        width: 88, height: 88, borderRadius: 44,
                        backgroundColor: theme.colors.creamSubtle,
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth: 2, borderColor: theme.colors.creamBorder,
                        overflow: 'hidden',
                    }}>
                        {user?.user_metadata?.avatar_url ? (
                            <Image
                                source={{ uri: user.user_metadata.avatar_url }}
                                style={{ width: 88, height: 88, borderRadius: 44 }}
                            />
                        ) : (
                            <Ionicons name="person" size={44} color={theme.colors.cream} />
                        )}
                    </View>

                    {/* Name + email */}
                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <Text style={{
                            color: theme.colors.cream,
                            fontSize: theme.typography.sizes.xl,
                            fontWeight: theme.typography.weights.semibold,
                        }}>
                            {fullName}
                        </Text>
                        <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.sm }}>
                            {email}
                        </Text>
                    </View>

                    {/* Stats row */}
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: theme.colors.creamSubtle,
                        borderRadius: theme.radius.xl,
                        marginTop: theme.spacing.sm,
                        overflow: 'hidden',
                    }}>
                        {[
                            { label: 'Devices', value: '4' },
                            { label: 'This month', value: '142 kWh' },
                            { label: 'Saved', value: '12%' },
                        ].map((stat, i, arr) => (
                            <View key={stat.label} style={{
                                flex: 1, alignItems: 'center',
                                paddingVertical: theme.spacing.md,
                                borderRightWidth: i < arr.length - 1 ? 0.5 : 0,
                                borderRightColor: theme.colors.creamBorder,
                            }}>
                                <Text style={{
                                    color: theme.colors.cream,
                                    fontSize: theme.typography.sizes.lg,
                                    fontWeight: theme.typography.weights.bold,
                                }}>
                                    {stat.value}
                                </Text>
                                <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.xs, marginTop: 2 }}>
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Menu sections */}
                <View style={{ padding: theme.spacing.xl, gap: theme.spacing.xl }}>
                    {MENU_SECTIONS.map((section, si) => (
                        <View key={si}>
                            {section.title ? (
                                <Text style={{
                                    color: theme.colors.gray500,
                                    fontSize: theme.typography.sizes.xs,
                                    fontWeight: theme.typography.weights.semibold,
                                    letterSpacing: 0.8,
                                    textTransform: 'uppercase',
                                    marginBottom: theme.spacing.sm,
                                    paddingHorizontal: theme.spacing.sm,
                                }}>
                                    {section.title}
                                </Text>
                            ) : null}

                            <View style={{
                                backgroundColor: theme.colors.white,
                                borderRadius: theme.radius.xl,
                                overflow: 'hidden',
                            }}>
                                {section.items.map((item, ii) => (
                                    <TouchableOpacity
                                        key={ii}
                                        onPress={item.onPress}
                                        style={{
                                            flexDirection: 'row', alignItems: 'center',
                                            padding: theme.spacing.lg,
                                            borderBottomWidth: ii < section.items.length - 1 ? 0.5 : 0,
                                            borderBottomColor: theme.colors.gray100,
                                        }}>
                                        {/* Icon */}
                                        <View style={{
                                            width: 36, height: 36, borderRadius: theme.radius.sm,
                                            backgroundColor: item.danger ? 'rgba(220,38,38,0.08)' : theme.colors.primaryLight,
                                            alignItems: 'center', justifyContent: 'center',
                                            marginRight: theme.spacing.md,
                                        }}>
                                            <Ionicons
                                                name={item.icon}
                                                size={18}
                                                color={item.danger ? theme.colors.error : theme.colors.primary}
                                            />
                                        </View>

                                        {/* Label */}
                                        <View style={{ flex: 1 }}>
                                            <Text style={{
                                                fontSize: theme.typography.sizes.md,
                                                fontWeight: theme.typography.weights.medium,
                                                color: item.danger ? theme.colors.error : theme.colors.primary,
                                            }}>
                                                {item.label}
                                            </Text>
                                            {item.sublabel && (
                                                <Text style={{ fontSize: theme.typography.sizes.xs, color: theme.colors.gray400, marginTop: 2 }}>
                                                    {item.sublabel}
                                                </Text>
                                            )}
                                        </View>

                                        {/* Arrow */}
                                        {!item.danger && (
                                            <Ionicons name="chevron-forward" size={16} color={theme.colors.gray300} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}