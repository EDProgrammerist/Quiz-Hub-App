import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import DetailsScreen from '../screens/details-screen/details-screen';
import ProfileScreen from '../screens/profile-screen';
import QuizApp from '../screens/quiz-app/quiz-app';
import SettingsScreen from '../screens/settings-screen';
import {useAppTheme} from '../theme/ThemeProvider';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackRouter() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="QuizApp" component={QuizApp} />
      <HomeStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

export default function TabRouter() {
  const {colors} = useAppTheme();

  return (
      <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({color, size}) => {
          const icons = {
            Home: 'home-outline',
            Profile: 'person-outline',
            Settings: 'settings-outline',
          } as const;

          return (
            <Ionicons
              name={icons[route.name as keyof typeof icons]}
              color={color}
              size={size}
            />
          );
        },
      })}>
        <Tab.Screen
          name="Home"
          component={HomeStackRouter}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{tabBarLabel: 'Profile'}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{tabBarLabel: 'Settings'}}
        />
      </Tab.Navigator>
  );
}
