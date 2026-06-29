import { theme } from '@/constants/theme';
import Constants from 'expo-constants';
import { Text } from 'react-native';

export function Footer() {
    const version = Constants.expoConfig?.version ?? '1.0.0';

    return (
        <Text style={{
            color: theme.colors.creamBorder,
            fontSize: theme.typography.sizes.xs,
            textAlign: 'center',
            marginTop: theme.spacing['3xl'],
        }}>
            Designed by RwegoHub · v{version}
        </Text>
    );
}