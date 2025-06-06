import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveEvent } from '../services/storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type RegioesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Regioes'>;

export default function RegioesScreen() {
  const navigation = useNavigation<RegioesScreenNavigationProp>();
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');

  const handleSubmit = async () => {
    if (!region.trim() || !city.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const newEvent = {
        id: Date.now().toString(),
        region: region.trim(),
        city: city.trim(),
        cep: cep.trim() || undefined,
        date: new Date().toLocaleDateString('pt-BR')
      };

      await saveEvent(newEvent);
      
      navigation.navigate('Tempo', {
        regionId: newEvent.id,
        regionName: `${newEvent.region}, ${newEvent.city}`
      });

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a região');
      console.error('Erro ao salvar região:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Região Atingida</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bairro/Região*</Text>
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
          placeholder="Digite o bairro ou região"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade*</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Digite a cidade"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CEP (Opcional)</Text>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={setCep}
          placeholder="00000-000"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={9}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, (!region.trim() || !city.trim()) && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!region.trim() || !city.trim()}
      >
        <Text style={styles.buttonText}>Salvar e Avançar</Text>
        <Text style={styles.buttonSubtext}>Próximo: Tempo de Interrupção</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: '#00ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    color: '#00ffff',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#00ffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  disabledButton: {
    backgroundColor: '#1a3a3a',
    borderColor: '#1a3a3a',
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSubtext: {
    color: '#0a3a3a',
    fontSize: 12,
    marginTop: 4,
  },
});