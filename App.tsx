/**
 * @format
 */

import './src/setupFonts';
import Provider from '@ant-design/react-native/lib/provider';
import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { antdTheme } from './src/constants/colors';
import { AppNavigation } from './src/navigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider theme={antdTheme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {/* NavigationContainer wraps Stack → Drawer → Tab navigators */}
          <AppNavigation />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
