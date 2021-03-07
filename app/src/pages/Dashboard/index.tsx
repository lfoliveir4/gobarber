import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  UserName,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get(`providers`).then((response) => setProviders(response.data));
  }, []);

  const navigateToProfile = useCallback(() => navigation.navigate('Profile'), [
    navigation,
  ]);

  const navigateToAppointmentCreate = useCallback(
    (providerId: string) =>
      navigation.navigate('CreateAppointment', { providerId }),
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => navigateToProfile()}>
          <UserAvatar
            source={{
              uri: user.avatar_url,
            }}
          />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Caleireiros</ProvidersListTitle>
        }
        renderItem={({ item }) => (
          <ProviderContainer
            onPress={() => navigateToAppointmentCreate(item.id)}>
            <ProviderAvatar
              source={{
                uri: item.avatar_url,
              }}
            />

            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda A sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>oito as 18</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
