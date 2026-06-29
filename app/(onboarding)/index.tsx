import { Button, Footer } from '@/components/ui';
import { theme } from '@/constants/theme';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        icon: '⚡',
        title: 'Track your energy in real time',
        subtitle: 'See exactly how much electricity your home is using at any moment — no guessing.',
    },
    {
        id: '2',
        icon: '💡',
        title: 'Control every bulb and socket',
        subtitle: 'See which devices are on right now and switch them off from anywhere.',
    },
    {
        id: '3',
        icon: '📉',
        title: 'Cut bills, save energy',
        subtitle: 'OmunPower helps you spot waste, reduce usage, and lower your electricity bill every month.',
    },
];

export default function Onboarding() {
    const [current, setCurrent] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const isLast = current === slides.length - 1;

    const handleNext = () => {
        if (!isLast) {
            flatListRef.current?.scrollToIndex({ index: current + 1, animated: true });
            setCurrent(current + 1);
        } else {
            router.replace('/(auth)/login' as any);
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrent(viewableItems[0].index ?? 0);
        }
    }).current;

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <StatusBar style="light" />

            {/* Skip */}
            <TouchableOpacity
                onPress={() => router.replace('/(auth)/login' as any)}
                style={{ alignSelf: 'flex-end', padding: theme.spacing['2xl'], paddingBottom: 0 }}>
                <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                    Skip
                </Text>
            </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <View style={{
                        width,
                        paddingHorizontal: theme.spacing['3xl'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: theme.spacing['2xl'],
                    }}>
                        <View style={{
                            width: 100, height: 100,
                            borderRadius: theme.radius['2xl'],
                            backgroundColor: theme.colors.creamSubtle,
                            alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Text style={{ fontSize: 44 }}>{item.icon}</Text>
                        </View>
                        <Text style={{
                            color: theme.colors.cream,
                            fontSize: theme.typography.sizes['3xl'],
                            fontWeight: theme.typography.weights.bold,
                            textAlign: 'center',
                            lineHeight: theme.typography.lineHeights.loose,
                        }}>
                            {item.title}
                        </Text>
                        <Text style={{
                            color: theme.colors.creamMuted,
                            fontSize: theme.typography.sizes.base,
                            textAlign: 'center',
                            lineHeight: theme.typography.lineHeights.normal,
                        }}>
                            {item.subtitle}
                        </Text>
                    </View>
                )}
            />

            {/* Bottom */}
            <View style={{
                paddingHorizontal: theme.spacing['3xl'],
                paddingBottom: theme.spacing['5xl'],
                gap: theme.spacing.lg,
            }}>
                {/* Dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.sm }}>
                    {slides.map((_, i) => (
                        <View key={i} style={{
                            height: 6, borderRadius: 3,
                            width: i === current ? 24 : 6,
                            backgroundColor: i === current ? theme.colors.cream : theme.colors.creamBorder,
                        }} />
                    ))}
                </View>

                <Button label={isLast ? 'Get started' : 'Continue'} onPress={handleNext} />

                {isLast && (
                    <TouchableOpacity
                        onPress={() => router.replace('/(auth)/login' as any)}
                        style={{ alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.md }}>
                            Already have an account?{' '}
                            <Text style={{ color: theme.colors.cream, fontWeight: theme.typography.weights.medium }}>
                                Sign in
                            </Text>
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Footer */}
                <Footer />
            </View>
        </View>
    );
}