import React from 'react';

import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import Dashboard from '../pages/Dashboard';

const App = createNativeStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      contentStyle: {
        backgroundColor: '#312e38',
      },
    }}>
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AuthRoutes;
