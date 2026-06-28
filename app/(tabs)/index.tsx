import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

const devices = [
  { id: '1', name: 'Living room bulb', type: 'bulb', watts: 9, room: 'Living room', on: true, duration: '2h 14m' },
  { id: '2', name: 'Kitchen socket', type: 'socket', watts: 1200, room: 'Kitchen', on: true, duration: '47m' },
  { id: '3', name: 'Bedroom bulb', type: 'bulb', watts: 9, room: 'Bedroom', on: false, duration: '' },
  { id: '4', name: 'Office socket', type: 'socket', watts: 800, room: 'Office', on: false, duration: '' },
];

const bars = [40, 60, 50, 80, 45, 70, 85];

export default function HomeScreen() {
  const [deviceStates, setDeviceStates] = useState(
    Object.fromEntries(devices.map((d) => [d.id, d.on]))
  );

  const toggleDevice = (id: string) => {
    setDeviceStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCount = Object.values(deviceStates).filter(Boolean).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#ECE8CD' }}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={{
        backgroundColor: '#0D453C',
        paddingTop: 56, paddingBottom: 24,
        paddingHorizontal: 24,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <View>
          <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 13 }}>Good morning</Text>
          <Text style={{ color: '#ECE8CD', fontSize: 22, fontWeight: '600', marginTop: 2 }}>Jean-Paul</Text>
        </View>
        <TouchableOpacity style={{
          width: 40, height: 40, borderRadius: 12,
          backgroundColor: 'rgba(236,232,205,0.1)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Ionicons name="notifications-outline" size={20} color="#ECE8CD" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Usage card */}
        <View style={{ margin: 20 }}>
          <View style={{
            backgroundColor: '#0D453C', borderRadius: 20, padding: 20,
          }}>
            <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 12, marginBottom: 4 }}>
              Current usage
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              <Text style={{ color: '#ECE8CD', fontSize: 40, fontWeight: '700', lineHeight: 44 }}>3.2</Text>
              <Text style={{ color: 'rgba(236,232,205,0.6)', fontSize: 16, marginBottom: 6 }}>kW</Text>
            </View>
            <Text style={{ color: 'rgba(236,232,205,0.5)', fontSize: 12, marginTop: 2 }}>
              Today: 14.8 kWh · Est. 2,100 RWF
            </Text>

            {/* Bar chart */}
            <View style={{
              flexDirection: 'row', alignItems: 'flex-end',
              gap: 6, height: 50, marginTop: 16,
            }}>
              {bars.map((h, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1, borderRadius: 4,
                    height: `${h}%`,
                    backgroundColor: i === bars.length - 1
                      ? '#ECE8CD'
                      : 'rgba(236,232,205,0.2)',
                  }}
                />
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <Text key={d} style={{ color: 'rgba(236,232,205,0.4)', fontSize: 10, flex: 1, textAlign: 'center' }}>{d}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{
            flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 16,
          }}>
            <Ionicons name="flash" size={20} color="#0D453C" />
            <Text style={{ color: '#0D453C', fontSize: 20, fontWeight: '700', marginTop: 8 }}>{activeCount}</Text>
            <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>Active devices</Text>
          </View>
          <View style={{
            flex: 1, backgroundColor: 'white', borderRadius: 16, padding: 16,
          }}>
            <Ionicons name="trending-down" size={20} color="#0D453C" />
            <Text style={{ color: '#0D453C', fontSize: 20, fontWeight: '700', marginTop: 8 }}>12%</Text>
            <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>Less than yesterday</Text>
          </View>
        </View>

        {/* Devices */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: '#0D453C', fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Devices
          </Text>
          <View style={{ gap: 10 }}>
            {devices.map((device) => (
              <View key={device.id} style={{
                backgroundColor: 'white', borderRadius: 16,
                padding: 16, flexDirection: 'row', alignItems: 'center',
              }}>
                {/* Icon */}
                <View style={{
                  width: 44, height: 44, borderRadius: 12,
                  backgroundColor: deviceStates[device.id]
                    ? 'rgba(13,69,60,0.1)' : '#f3f4f6',
                  alignItems: 'center', justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Ionicons
                    name={device.type === 'bulb' ? 'bulb-outline' : 'power-outline'}
                    size={22}
                    color={deviceStates[device.id] ? '#0D453C' : '#9ca3af'}
                  />
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14, fontWeight: '500',
                    color: deviceStates[device.id] ? '#0D453C' : '#9ca3af',
                  }}>
                    {device.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                    {device.watts >= 1000 ? `${device.watts / 1000}kW` : `${device.watts}W`}
                    {deviceStates[device.id] && device.duration ? ` · on ${device.duration}` : ' · off'}
                  </Text>
                </View>

                {/* Toggle */}
                <Switch
                  value={deviceStates[device.id]}
                  onValueChange={() => toggleDevice(device.id)}
                  trackColor={{ false: '#e5e7eb', true: '#0D453C' }}
                  thumbColor="#ECE8CD"
                />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}