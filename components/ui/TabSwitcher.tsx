import { theme } from '@/constants/theme';
import { Text, TouchableOpacity, View } from 'react-native';

interface Tab {
    key: string;
    label: string;
}

interface TabSwitcherProps {
    tabs: Tab[];
    active: string;
    onChange: (key: string) => void;
}

export function TabSwitcher({ tabs, active, onChange }: TabSwitcherProps) {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.creamSubtle,
            borderRadius: theme.radius.md,
            padding: 4,
        }}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    onPress={() => onChange(tab.key)}
                    style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: active === tab.key ? theme.colors.cream : 'transparent',
                    }}>
                    <Text style={{
                        fontSize: theme.typography.sizes.md,
                        fontWeight: theme.typography.weights.medium,
                        color: active === tab.key ? theme.colors.primary : theme.colors.creamMuted,
                    }}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}