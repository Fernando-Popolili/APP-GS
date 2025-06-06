import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import MenuScreen from './screens/MenuScreen';
import EventosScreen from './screens/EventosScreen';
import RegioesScreen from './screens/RegioesScreen';
import TempoScreen from './screens/TempoScreen';
import PrejuizosScreen from './screens/PrejuizosScreen';
import RecomendacoesScreen from './screens/RecomendacoesScreen';

// Tipagem das rotas
export type RootStackParamList = {
  Menu: undefined;
  Eventos: undefined;
  Regioes: undefined;
  Tempo: { regionId: string; regionName: string };
  Prejuizos: { regionId: string; regionName: string };
  Recomendacoes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0a0a0a',
          },
          headerTintColor: '#00ffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: '', // Solução definitiva para o erro
          contentStyle: {
            backgroundColor: '#0a0a0a',
          }
        }}
      >
        {/* Configuração simplificada das telas */}
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Eventos" component={EventosScreen} />
        <Stack.Screen name="Regioes" component={RegioesScreen} />
        <Stack.Screen name="Tempo" component={TempoScreen} />
        <Stack.Screen name="Prejuizos" component={PrejuizosScreen} />
        <Stack.Screen name="Recomendacoes" component={RecomendacoesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}