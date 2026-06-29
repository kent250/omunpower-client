import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { name: string; label: string; icon: IconName; activeIcon: IconName }[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', activeIcon: 'flash' },
  { name: 'devices', label: 'Devices', icon: 'bulb-outline', activeIcon: 'bulb' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  { name: 'settings', label: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray400,
        tabBarStyle: {
          backgroundColor: theme.colors.cream,
          borderTopColor: '#d6d2b8',
          borderTopWidth: 1,
          height: 80,
          paddingTop: 10,
          paddingBottom: 16,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.sizes.xs,
          fontWeight: theme.typography.weights.medium,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? tab.activeIcon : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}