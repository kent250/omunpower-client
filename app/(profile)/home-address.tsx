import { Button, Input, ScreenHeader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeAddress() {
    const [province, setProvince] = useState('');
    const [sector, setSector] = useState('');
    const [cell, setCell] = useState('');
    const [village, setVillage] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    const isComplete = province && sector && cell && village && houseNumber;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <ScreenHeader title="Home address" />

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* House illustration */}
                <View style={{ alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}>
                    {/* House icon */}
                    <View style={{
                        width: 88, height: 88, borderRadius: 44,
                        backgroundColor: theme.colors.creamSubtle,
                        alignItems: 'center', justifyContent: 'center',
                        borderWidth: 2, borderColor: theme.colors.creamBorder,
                    }}>
                        <Ionicons name="home" size={44} color={theme.colors.cream} />
                    </View>

                    {/* Address preview */}
                    <View style={{ alignItems: 'center', marginTop: theme.spacing.xl, gap: 4 }}>
                        {isComplete ? (
                            <>
                                <Text style={{
                                    color: theme.colors.cream,
                                    fontSize: theme.typography.sizes.md,
                                    fontWeight: theme.typography.weights.semibold,
                                    textAlign: 'center',
                                }}>
                                    {houseNumber}, {village}
                                </Text>
                                <Text style={{
                                    color: theme.colors.creamMuted,
                                    fontSize: theme.typography.sizes.sm,
                                    textAlign: 'center',
                                }}>
                                    {cell}, {sector}, {province}
                                </Text>
                            </>
                        ) : (
                            <Text style={{
                                color: theme.colors.creamMuted,
                                fontSize: theme.typography.sizes.sm,
                                textAlign: 'center',
                            }}>
                                Fill in the details below to set your home address
                            </Text>
                        )}
                    </View>
                </View>

                {/* Form */}
                <View style={{ paddingHorizontal: theme.spacing.xl, gap: theme.spacing.xl }}>
                    <Input
                        label="Province"
                        value={province}
                        onChangeText={setProvince}
                        placeholder="e.g. Kigali"
                    />
                    <Input
                        label="Sector"
                        value={sector}
                        onChangeText={setSector}
                        placeholder="e.g. Kimironko"
                    />
                    <Input
                        label="Cell"
                        value={cell}
                        onChangeText={setCell}
                        placeholder="e.g. Bibare"
                    />
                    <Input
                        label="Village"
                        value={village}
                        onChangeText={setVillage}
                        placeholder="e.g. Agaciro"
                    />
                    <Input
                        label="House number"
                        value={houseNumber}
                        onChangeText={setHouseNumber}
                        placeholder="e.g. KG 123 St"
                    />

                    <Button label="Save address" onPress={() => router.back()} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}