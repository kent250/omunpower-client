import { theme } from '@/constants/theme';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
    variant?: 'white' | 'dark';
}

export function Card({ children, variant = 'white', style, ...props }: CardProps) {
    return (
        <View
            style={[{
                backgroundColor: variant === 'dark' ? theme.colors.primary : theme.colors.white,
                borderRadius: theme.radius['2xl'],
                padding: theme.spacing.xl,
            }, style]}
            {...props}>
            {children}
        </View>
    );
}