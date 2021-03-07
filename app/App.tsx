import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import React from 'react';
import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import AppProvider from './src/context';

enableScreens();

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#312e38"
          translucent
        />
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
