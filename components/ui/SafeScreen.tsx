import { theme } from '@/constants/theme';
import { ScrollView, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface SafeScreenProps {
    children: React.ReactNode;
    backgroundColor?: string;
    scroll?: boolean;
    style?: ViewStyle;
}

export function SafeScreen({
    children,
    backgroundColor = theme.colors.primary,
    scroll = false,
    style,
}: SafeScreenProps) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            {scroll ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <View style={[{ flex: 1 }, style]}>{children}</View>
                </ScrollView>
            ) : (
                <View style={[{ flex: 1 }, style]}>{children}</View>
            )}
        </SafeAreaView>
    );
}