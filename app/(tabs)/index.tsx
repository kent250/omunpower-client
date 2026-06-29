import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const devices = [
  { id: '1', name: 'Living room bulb', type: 'bulb', watts: 9, on: true, duration: '2h 14m' },
  { id: '2', name: 'Kitchen socket', type: 'socket', watts: 1200, on: true, duration: '47m' },
  { id: '3', name: 'Bedroom bulb', type: 'bulb', watts: 9, on: false, duration: '' },
  { id: '4', name: 'Office socket', type: 'socket', watts: 800, on: false, duration: '' },
];

const bars = [40, 60, 50, 80, 45, 70, 85];

export default function HomeScreen() {
  const [deviceStates, setDeviceStates] = useState(
    Object.fromEntries(devices.map((d) => [d.id, d.on]))
  );

  const toggleDevice = (id: string) =>
    setDeviceStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeCount = Object.values(deviceStates).filter(Boolean).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }} edges={['top']}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{
        backgroundColor: theme.colors.primary,
        paddingBottom: theme.spacing['2xl'],
        paddingHorizontal: theme.spacing['2xl'],
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <View>
          <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.sm }}>
            Good morning
          </Text>
          <Text style={{
            color: theme.colors.cream,
            fontSize: theme.typography.sizes['2xl'],
            fontWeight: theme.typography.weights.semibold,
            marginTop: 2,
          }}>
            Jean-Paul
          </Text>
        </View>
        <TouchableOpacity style={{
          width: 40, height: 40, borderRadius: theme.radius.md,
          backgroundColor: theme.colors.creamSubtle,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Ionicons name="notifications-outline" size={20} color={theme.colors.cream} />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.cream }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: theme.spacing.xl, gap: theme.spacing.xl, paddingBottom: 32 }}>

        {/* Usage card */}
        <View style={{ backgroundColor: theme.colors.primary, borderRadius: theme.radius['2xl'], padding: theme.spacing.xl }}>
          <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.sm, marginBottom: 4 }}>
            Current usage
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
            <Text style={{ color: theme.colors.cream, fontSize: theme.typography.sizes['5xl'], fontWeight: theme.typography.weights.bold, lineHeight: 44 }}>
              3.2
            </Text>
            <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.lg, marginBottom: 6 }}>kW</Text>
          </View>
          <Text style={{ color: theme.colors.creamMuted, fontSize: theme.typography.sizes.sm, marginTop: 2 }}>
            Today: 14.8 kWh · Est. 2,100 RWF
          </Text>

          {/* Bar chart */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 50, marginTop: 16 }}>
            {bars.map((h, i) => (
              <View key={i} style={{
                flex: 1, borderRadius: 4,
                height: `${h}%`,
                backgroundColor: i === bars.length - 1 ? theme.colors.cream : theme.colors.creamSubtle,
              }} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <Text key={d} style={{ flex: 1, textAlign: 'center', color: theme.colors.creamBorder, fontSize: theme.typography.sizes.xs }}>
                {d}
              </Text>
            ))}
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
          {[
            { icon: 'flash' as const, value: `${activeCount}`, label: 'Active devices' },
            { icon: 'trending-down' as const, value: '12%', label: 'Less than yesterday' },
          ].map((stat) => (
            <View key={stat.label} style={{
              flex: 1, backgroundColor: theme.colors.white,
              borderRadius: theme.radius.xl, padding: theme.spacing.lg,
            }}>
              <Ionicons name={stat.icon} size={20} color={theme.colors.primary} />
              <Text style={{
                color: theme.colors.primary,
                fontSize: theme.typography.sizes['2xl'],
                fontWeight: theme.typography.weights.bold,
                marginTop: theme.spacing.sm,
              }}>
                {stat.value}
              </Text>
              <Text style={{ color: theme.colors.gray500, fontSize: theme.typography.sizes.sm, marginTop: 2 }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Devices */}
        <View>
          <Text style={{
            color: theme.colors.primary,
            fontSize: theme.typography.sizes.lg,
            fontWeight: theme.typography.weights.semibold,
            marginBottom: theme.spacing.md,
          }}>
            Devices
          </Text>
          <View style={{ gap: theme.spacing.sm }}>
            {devices.map((device) => (
              <View key={device.id} style={{
                backgroundColor: theme.colors.white,
                borderRadius: theme.radius.xl,
                padding: theme.spacing.lg,
                flexDirection: 'row', alignItems: 'center',
              }}>
                <View style={{
                  width: 44, height: 44, borderRadius: theme.radius.md,
                  backgroundColor: deviceStates[device.id] ? theme.colors.primaryLight : theme.colors.gray100,
                  alignItems: 'center', justifyContent: 'center',
                  marginRight: theme.spacing.md,
                }}>
                  <Ionicons
                    name={device.type === 'bulb' ? 'bulb-outline' : 'power-outline'}
                    size={22}
                    color={deviceStates[device.id] ? theme.colors.primary : theme.colors.gray400}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: theme.typography.sizes.md,
                    fontWeight: theme.typography.weights.medium,
                    color: deviceStates[device.id] ? theme.colors.primary : theme.colors.gray400,
                  }}>
                    {device.name}
                  </Text>
                  <Text style={{ fontSize: theme.typography.sizes.sm, color: theme.colors.gray400, marginTop: 2 }}>
                    {device.watts >= 1000 ? `${device.watts / 1000}kW` : `${device.watts}W`}
                    {deviceStates[device.id] && device.duration ? ` · on ${device.duration}` : ' · off'}
                  </Text>
                </View>
                <Switch
                  value={deviceStates[device.id]}
                  onValueChange={() => toggleDevice(device.id)}
                  trackColor={{ false: theme.colors.gray300, true: theme.colors.primary }}
                  thumbColor={theme.colors.cream}
                />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}