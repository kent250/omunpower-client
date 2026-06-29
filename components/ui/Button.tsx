import { theme } from '@/constants/theme';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
}

export function Button({
    label,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
}: ButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={{
                backgroundColor: isPrimary ? theme.colors.cream : 'transparent',
                borderRadius: theme.radius.lg,
                paddingVertical: theme.spacing.lg,
                alignItems: 'center',
                opacity: disabled ? 0.5 : 1,
            }}>
            {loading ? (
                <ActivityIndicator color={isPrimary ? theme.colors.primary : theme.colors.cream} />
            ) : (
                <Text style={{
                    color: isPrimary ? theme.colors.primary : theme.colors.creamMuted,
                    fontSize: theme.typography.sizes.lg,
                    fontWeight: theme.typography.weights.semibold,
                }}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}