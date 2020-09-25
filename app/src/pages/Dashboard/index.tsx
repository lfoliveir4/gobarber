import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import {useAuth} from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <View>
      <Text>dash</Text>

      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
};

export default Dashboard;
