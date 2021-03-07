import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({ routes: [{ name: 'Dashboard' }], index: 0 });
  }, []);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE ', dia' dd 'de' MMMM 'de' yyy 'as' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={90} color="#04d361" />

      <Title>Agendamento Concluido</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
