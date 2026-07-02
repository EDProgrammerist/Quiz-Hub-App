import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';
import React, {createContext, ReactNode, useContext, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  MD3Theme,
} from 'react-native-paper';
import useUserStore from '../store/useUserStore';

export type AppThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  tabBar: string;
  tabInactive: string;
  shadow: string;
  danger: string;
};

type AppThemeContextValue = {
  isDark: boolean;
  colors: AppThemeColors;
  paperTheme: MD3Theme;
  navigationTheme: NavigationTheme;
};

const lightColors: AppThemeColors = {
  background: '#FAFAFA',
  surface: '#ffffff',
  surfaceMuted: '#f2f2f2',
  text: '#000000',
  mutedText: '#707070',
  border: '#edf0f7',
  primary: '#33C7EA',
  tabBar: '#061045',
  tabInactive: '#ffffff',
  shadow: '#000000',
  danger: '#d84a4a',
};

const darkColors: AppThemeColors = {
  background: '#10131c',
  surface: '#1b2030',
  surfaceMuted: '#252b3d',
  text: '#f8f9ff',
  mutedText: '#aeb6c7',
  border: '#30374c',
  primary: '#33C7EA',
  tabBar: '#050814',
  tabInactive: '#aeb6c7',
  shadow: '#000000',
  danger: '#ff8b8b',
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({children}: AppThemeProviderProps) => {
  const themeMode = useUserStore(state => state.themeMode);
  const systemScheme = useColorScheme();
  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const paperTheme = useMemo<MD3Theme>(() => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.primary,
        background: colors.background,
        surface: colors.surface,
        surfaceVariant: colors.surfaceMuted,
        onSurface: colors.text,
        onBackground: colors.text,
        outline: colors.border,
        error: colors.danger,
      },
    };
  }, [colors, isDark]);

  const navigationTheme = useMemo<NavigationTheme>(() => {
    const baseTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.primary,
      },
    };
  }, [colors, isDark]);

  const value = useMemo(
    () => ({
      isDark,
      colors,
      paperTheme,
      navigationTheme,
    }),
    [colors, isDark, navigationTheme, paperTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const value = useContext(AppThemeContext);

  if (!value) {
    throw new Error('useAppTheme must be used inside AppThemeProvider');
  }

  return value;
};
