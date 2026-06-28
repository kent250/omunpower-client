import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        title: 'Track your energy in real time',
        subtitle: 'See exactly how much electricity your home is using at any moment — no guessing.',
        icon: '⚡',
    },
    {
        id: 2,
        title: 'Control every bulb and socket',
        subtitle: 'See which devices are on right now and switch them off from anywhere.',
        icon: '💡',
    },
    {
        id: 3,
        title: 'Cut bills, save energy',
        subtitle: 'OmunPower helps you spot waste, reduce usage, and lower your electricity bill every month.',
        icon: '📉',
    },
];

export default function Onboarding() {
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < slides.length - 1) {
            setCurrent(current + 1);
        } else {
            router.replace('/(auth)/login');
        }
    };

    const handleSkip = () => {
        router.replace('/(auth)/login');
    };

    const slide = slides[current];

    return (
        <View style={{ flex: 1, backgroundColor: '#0D453C', paddingHorizontal: 32, paddingVertical: 60, justifyContent: 'space-between' }}>
            <StatusBar style="light" />

            {/* Skip */}
            <TouchableOpacity onPress={handleSkip} style={{ alignSelf: 'flex-end' }}>
                <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>Skip</Text>
            </TouchableOpacity>

            {/* Icon + Content */}
            <View style={{ alignItems: 'center', gap: 24 }}>
                <View style={{
                    width: 100, height: 100, borderRadius: 28,
                    backgroundColor: 'rgba(236,232,205,0.1)',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{ fontSize: 44 }}>{slide.icon}</Text>
                </View>
                <Text style={{
                    color: '#ECE8CD', fontSize: 26, fontWeight: '600',
                    textAlign: 'center', lineHeight: 34
                }}>
                    {slide.title}
                </Text>
                <Text style={{
                    color: 'rgba(236,232,205,0.6)', fontSize: 15,
                    textAlign: 'center', lineHeight: 24
                }}>
                    {slide.subtitle}
                </Text>
            </View>

            {/* Bottom */}
            <View style={{ gap: 16 }}>
                {/* Dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                    {slides.map((_, i) => (
                        <View key={i} style={{
                            height: 6, borderRadius: 3,
                            width: i === current ? 24 : 6,
                            backgroundColor: i === current ? '#ECE8CD' : 'rgba(236,232,205,0.3)',
                        }} />
                    ))}
                </View>

                {/* Next Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        backgroundColor: '#ECE8CD', borderRadius: 14,
                        paddingVertical: 16, alignItems: 'center'
                    }}>
                    <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600' }}>
                        {current === slides.length - 1 ? 'Get started' : 'Continue'}
                    </Text>
                </TouchableOpacity>

                {/* Login link on last slide */}
                {current === slides.length - 1 && (
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login')} style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 14 }}>
                            Already have an account? <Text style={{ color: '#ECE8CD' }}>Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}