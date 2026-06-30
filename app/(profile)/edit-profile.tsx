import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfile() {
    const { user } = useAuth();
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.user_metadata?.phone_number || '');
    const [avatar, setAvatar] = useState<string | null>(user?.user_metadata?.avatar_url || null);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            await uploadAvatar(result.assets[0].base64, result.assets[0].uri);
        }
    };

    const uploadAvatar = async (base64: string, uri: string) => {
        if (!user) return;
        setUploadingImage(true);
        try {
            const filePath = `${user.id}/avatar.jpg`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, decode(base64), {
                    contentType: 'image/jpeg',
                    upsert: true,
                });


            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            const publicUrl = `${data.publicUrl}?t=${Date.now()}`; // cache bust

            setAvatar(publicUrl);
        } catch (error: any) {
            Alert.alert('Upload failed', error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            Alert.alert('Error', 'Full name is required');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName.trim(),
                    avatar_url: avatar,
                    phone_number: phone.trim(),
                },
            });
            if (error) throw error;
            Alert.alert('Saved', 'Your profile has been updated.', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeAvatar = async () => {
        if (!user || !avatar) return;
        setUploadingImage(true);
        try {
            const filePath = `${user.id}/avatar.jpg`; // adjust if you stored a different extension
            await supabase.storage.from('avatars').remove([filePath]);

            const { error } = await supabase.auth.updateUser({
                data: { avatar_url: null },
            });
            if (error) throw error;

            setAvatar(null);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setUploadingImage(false);
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
                    Edit profile
                </Text>
            </View>

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.primary }}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* Avatar */}
                <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}>
                    <TouchableOpacity onPress={pickImage} disabled={uploadingImage}>
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
                        {uploadingImage ? 'Uploading...' : 'Tap to change photo'}
                    </Text>

                    {avatar && !uploadingImage && (
                        <TouchableOpacity onPress={removeAvatar} style={{ marginTop: theme.spacing.xs }}>
                            <Text style={{
                                color: theme.colors.error,
                                fontSize: theme.typography.sizes.sm,
                                fontWeight: theme.typography.weights.medium,
                            }}>
                                Remove photo
                            </Text>
                        </TouchableOpacity>
                    )}
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
                        editable={false}
                        placeholder="you@example.com"
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

                <Button label="Save changes" onPress={handleSave} loading={loading} />

            </ScrollView>
        </SafeAreaView>
    );
}