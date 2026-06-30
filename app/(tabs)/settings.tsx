import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function SettingsScreen() {
    const [language, setLanguage] = useState('English');
    const [units, setUnits] = useState<'kWh' | 'kW'>('kWh');
    const [currency, setCurrency] = useState('RWF');
    const [darkMode, setDarkMode] = useState(false);
    const [biometricLock, setBiometricLock] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const cycleLanguage = () => {
        const options = ['English', 'Kinyarwanda', 'Français'];
        const next = options[(options.indexOf(language) + 1) % options.length];
        setLanguage(next);
    };

    const cycleCurrency = () => {
        const options = ['RWF', 'USD'];
        const next = options[(options.indexOf(currency) + 1) % options.length];
        setCurrency(next);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Fixes pull-down bounce */}
            <View style={{
                position: 'absolute', top: -300, left: 0, right: 0, height: 300,
                backgroundColor: theme.colors.primary,
            }} />

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
                    Settings
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.cream }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 40 }}>

                {/* Preferences */}
                <View>
                    <Text style={{
                        color: theme.colors.gray500,
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.semibold,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        marginBottom: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.sm,
                    }}>
                        Preferences
                    </Text>

                    <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.xl, overflow: 'hidden' }}>

                        <SettingRow
                            icon="language-outline"
                            label="Language"
                            value={language}
                            onPress={cycleLanguage}
                        />



                    </View>
                </View>

                {/* Data & sync */}
                <View>
                    <Text style={{
                        color: theme.colors.gray500,
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.semibold,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        marginBottom: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.sm,
                    }}>
                        Data & sync
                    </Text>

                    <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.xl, overflow: 'hidden' }}>
                        <SettingRow
                            icon="refresh-outline"
                            label="Auto-refresh readings"
                            sublabel="Update usage data every 30 seconds"
                            right={
                                <Switch
                                    value={autoRefresh}
                                    onValueChange={setAutoRefresh}
                                    trackColor={{ false: theme.colors.gray300, true: theme.colors.primary }}
                                    thumbColor={theme.colors.cream}
                                />
                            }
                        />


                    </View>
                </View>

                {/* Security */}
                <View>
                    <Text style={{
                        color: theme.colors.gray500,
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.semibold,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        marginBottom: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.sm,
                    }}>
                        Security
                    </Text>

                    <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.xl, overflow: 'hidden' }}>
                        <SettingRow
                            icon="finger-print-outline"
                            label="Biometric lock"
                            sublabel="Require Face ID / fingerprint to open app"
                            isLast
                            right={
                                <Switch
                                    value={biometricLock}
                                    onValueChange={setBiometricLock}
                                    trackColor={{ false: theme.colors.gray300, true: theme.colors.primary }}
                                    thumbColor={theme.colors.cream}
                                />
                            }
                        />
                    </View>
                </View>

                {/* About */}
                <View>
                    <Text style={{
                        color: theme.colors.gray500,
                        fontSize: theme.typography.sizes.xs,
                        fontWeight: theme.typography.weights.semibold,
                        letterSpacing: 0.8,
                        textTransform: 'uppercase',
                        marginBottom: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.sm,
                    }}>
                        About
                    </Text>

                    <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.xl, overflow: 'hidden' }}>
                        <SettingRow
                            icon="document-text-outline"
                            label="Terms of service"
                            onPress={() => { }}
                        />
                        <SettingRow
                            icon="shield-checkmark-outline"
                            label="Privacy policy"
                            onPress={() => { }}
                        />
                        <SettingRow
                            icon="information-circle-outline"
                            label="App version"
                            value="1.0.0"
                            isLast
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

interface SettingRowProps {
    icon: IconName;
    label: string;
    sublabel?: string;
    value?: string;
    onPress?: () => void;
    right?: React.ReactNode;
    isLast?: boolean;
}

function SettingRow({ icon, label, sublabel, value, onPress, right, isLast }: SettingRowProps) {
    const content = (
        <View style={{
            flexDirection: 'row', alignItems: 'center',
            padding: theme.spacing.lg,
            borderBottomWidth: isLast ? 0 : 0.5,
            borderBottomColor: theme.colors.gray100,
        }}>
            <View style={{
                width: 36, height: 36, borderRadius: theme.radius.sm,
                backgroundColor: theme.colors.primaryLight,
                alignItems: 'center', justifyContent: 'center',
                marginRight: theme.spacing.md,
            }}>
                <Ionicons name={icon} size={18} color={theme.colors.primary} />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.medium,
                    color: theme.colors.primary,
                }}>
                    {label}
                </Text>
                {sublabel && (
                    <Text style={{ fontSize: theme.typography.sizes.xs, color: theme.colors.gray400, marginTop: 2 }}>
                        {sublabel}
                    </Text>
                )}
            </View>

            {right ? right : value ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.gray400 }}>
                        {value}
                    </Text>
                    {onPress && <Ionicons name="chevron-forward" size={16} color={theme.colors.gray300} />}
                </View>
            ) : onPress ? (
                <Ionicons name="chevron-forward" size={16} color={theme.colors.gray300} />
            ) : null}
        </View>
    );

    if (onPress) {
        return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
    }
    return content;
}