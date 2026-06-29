import { Button, Input, ScreenHeader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfile() {
    const [fullName, setFullName] = useState('Jean-Paul Uwimana');
    const [email, setEmail] = useState('jeanpaul@example.com');
    const [phone, setPhone] = useState('788123456');
    const [avatar, setAvatar] = useState<string | null>(null);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <ScreenHeader title="Edit profile" />

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* Avatar */}
                <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={{
                            width: 88, height: 88, borderRadius: 44,
                            backgroundColor: theme.colors.creamSubtle,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 2, borderColor: theme.colors.creamBorder,
                            overflow: 'hidden',
                        }}>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={{ width: 88, height: 88, borderRadius: 44 }} />
                            ) : (
                                <Ionicons name="person" size={44} color={theme.colors.cream} />
                            )}
                        </View>

                        {/* Camera badge */}
                        <View style={{
                            position: 'absolute', bottom: 0, right: 0,
                            width: 26, height: 26, borderRadius: 13,
                            backgroundColor: theme.colors.cream,
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 2, borderColor: theme.colors.primary,
                        }}>
                            <Ionicons name="camera" size={13} color={theme.colors.primary} />
                        </View>
                    </TouchableOpacity>

                    <Text style={{
                        color: theme.colors.creamMuted,
                        fontSize: theme.typography.sizes.sm,
                        marginTop: theme.spacing.sm,
                    }}>
                        Tap to change photo
                    </Text>
                </View>

                {/* Fields */}
                <View style={{ gap: theme.spacing.xl }}>
                    <Input
                        label="Full name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Jean-Paul Uwimana"
                    />
                    <Input
                        label="Email address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Phone number"
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="7XX XXX XXX"
                        keyboardType="phone-pad"
                        prefix="+250"
                    />
                </View>

                <Button label="Save changes" onPress={() => router.back()} />

            </ScrollView>
        </SafeAreaView>
    );
}