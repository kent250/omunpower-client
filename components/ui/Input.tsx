import { theme } from '@/constants/theme';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label: string;
}

export function Input({ label, ...props }: InputProps) {
    return (
        <View>
            <Text style={{
                color: theme.colors.creamMuted,
                fontSize: theme.typography.sizes.sm,
                marginBottom: theme.spacing.xs,
            }}>
                {label}
            </Text>
            <TextInput
                placeholderTextColor={theme.colors.creamBorder}
                style={{
                    backgroundColor: theme.colors.creamSubtle,
                    borderWidth: 0.5,
                    borderColor: theme.colors.creamBorder,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.lg,
                    color: theme.colors.cream,
                    fontSize: theme.typography.sizes.base,
                }}
                {...props}
            />
        </View>
    );
}