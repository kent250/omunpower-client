import { ScreenHeader } from '@/components/ui';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQS = [
    {
        question: 'How does OmunPower track my electricity usage?',
        answer: 'OmunPower uses an ESP32 device installed at your home that monitors your electricity consumption in real time and sends the data to the app.',
    },
    {
        question: 'Can I control devices remotely?',
        answer: 'Yes! As long as your ESP32 device is connected to the internet, you can turn any connected bulb or socket on or off from anywhere.',
    },
    {
        question: 'How accurate are the readings?',
        answer: 'Readings are updated every few seconds and are accurate to within 1-2% of actual consumption depending on your ESP32 sensor setup.',
    },
    {
        question: 'What happens if my internet goes down?',
        answer: 'If your internet goes down, the app will show the last known readings. Control features will be unavailable until the connection is restored.',
    },
    {
        question: 'How do I add a new device?',
        answer: 'Go to the Devices tab and tap the + button. Follow the setup instructions to connect your new bulb or socket to your ESP32.',
    },
    {
        question: 'How is my data kept private?',
        answer: 'Your data is encrypted and stored securely. We never share your usage data with third parties.',
    },
    {
        question: 'How do I reset my ESP32 device?',
        answer: 'Hold the reset button on your ESP32 for 5 seconds until the LED blinks. Then follow the setup process again in the app.',
    },
];

export default function HelpFaqs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) =>
        setOpenIndex(openIndex === i ? null : i);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <ScreenHeader title="Help & FAQs" />

            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.cream }}
                contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.md }}
                showsVerticalScrollIndicator={false}>

                {FAQS.map((faq, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => toggle(i)}
                        style={{
                            backgroundColor: theme.colors.white,
                            borderRadius: theme.radius.xl,
                            padding: theme.spacing.lg,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                            <View style={{
                                width: 32, height: 32, borderRadius: theme.radius.sm,
                                backgroundColor: theme.colors.primaryLight,
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: theme.colors.primary,
                                    fontSize: theme.typography.sizes.sm,
                                    fontWeight: theme.typography.weights.bold,
                                }}>
                                    Q
                                </Text>
                            </View>
                            <Text style={{
                                flex: 1,
                                fontSize: theme.typography.sizes.md,
                                fontWeight: theme.typography.weights.medium,
                                color: theme.colors.primary,
                                lineHeight: theme.typography.lineHeights.tight,
                            }}>
                                {faq.question}
                            </Text>
                            <Ionicons
                                name={openIndex === i ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                color={theme.colors.gray400}
                            />
                        </View>

                        {openIndex === i && (
                            <Text style={{
                                color: theme.colors.gray500,
                                fontSize: theme.typography.sizes.sm,
                                lineHeight: theme.typography.lineHeights.tight,
                                marginTop: theme.spacing.md,
                                paddingLeft: 44,
                            }}>
                                {faq.answer}
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
}