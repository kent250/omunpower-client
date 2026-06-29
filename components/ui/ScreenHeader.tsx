import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface ScreenHeaderProps {
    title: string;
    onBack?: () => void;
}

export function ScreenHeader({ title, onBack }: ScreenHeaderProps) {
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
            gap: theme.spacing.md,
        }}>
            <TouchableOpacity
                onPress={onBack ?? (() => router.back())}
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
                {title}
            </Text>
        </View>
    );
}