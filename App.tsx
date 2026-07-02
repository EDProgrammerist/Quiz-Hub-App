import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Routes from './src/routes';
import {AppThemeProvider, useAppTheme} from './src/theme/ThemeProvider';

const AppContent = () => {
  const {colors, isDark} = useAppTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Routes />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AppThemeProvider>
      <AppContent />
    </AppThemeProvider>
  );
};

export default App;
