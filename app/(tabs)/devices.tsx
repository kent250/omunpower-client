import { theme } from '@/constants/theme';
import { Text, View } from 'react-native';

export default function DevicesScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.cream, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors.primary, fontSize: theme.typography.sizes.lg, fontWeight: theme.typography.weights.semibold }}>
                Devices
            </Text>
            <Text style={{ color: theme.colors.gray400, fontSize: theme.typography.sizes.md, marginTop: theme.spacing.sm }}>
                Coming soon
            </Text>
        </View>
    );
}