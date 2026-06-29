import { theme } from '@/constants/theme';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label: string;
    prefix?: string;
}

export function Input({ label, prefix, ...props }: InputProps) {
    return (
        <View>
            <Text style={{
                color: theme.colors.creamMuted,
                fontSize: theme.typography.sizes.sm,
                marginBottom: theme.spacing.xs,
            }}>
                {label}
            </Text>
            <View style={{
                flexDirection: 'row',
                backgroundColor: theme.colors.creamSubtle,
                borderWidth: 0.5,
                borderColor: theme.colors.creamBorder,
                borderRadius: theme.radius.md,
                alignItems: 'center',
            }}>
                {prefix && (
                    <View style={{
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.lg,
                        borderRightWidth: 0.5,
                        borderRightColor: theme.colors.creamBorder,
                    }}>
                        <Text style={{ color: theme.colors.cream, fontSize: theme.typography.sizes.base }}>
                            {prefix}
                        </Text>
                    </View>
                )}
                <TextInput
                    placeholderTextColor={theme.colors.creamBorder}
                    style={{
                        flex: 1,
                        padding: theme.spacing.lg,
                        color: theme.colors.cream,
                        fontSize: theme.typography.sizes.base,
                    }}
                    {...props}
                />
            </View>
        </View>
    );
}