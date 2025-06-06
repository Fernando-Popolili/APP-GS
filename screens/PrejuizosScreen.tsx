import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { saveEvent } from '../services/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type PrejuizosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Prejuizos'>;
type RouteParams = {
  regionId: string;
  regionName: string;
};

export default function PrejuizosScreen() {
  const navigation = useNavigation<PrejuizosScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as RouteParams;

  const [damages, setDamages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!damages.trim()) {
      Alert.alert('Atenção', 'Descreva os prejuízos causados');
      return;
    }

    setLoading(true);

    try {
      await saveEvent({
        id: params.regionId,
        damages: damages.trim(),
        date: new Date().toLocaleDateString('pt-BR')
      });

      // Navega diretamente para o Menu após salvar
      navigation.navigate('Menu');
      
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os prejuízos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Prejuízos</Text>
      <Text style={styles.regionText}>{params.regionName}</Text>

      <Text style={styles.label}>Descrição dos Prejuízos*:</Text>
      <TextInput
        style={styles.textArea}
        value={damages}
        onChangeText={setDamages}
        placeholder="Ex: 3 residências afetadas, comércio fechado..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={5}
      />

      <TouchableOpacity
        style={[styles.button, (!damages.trim() || loading) && styles.disabledButton]}
        onPress={handleSave}
        disabled={!damages.trim() || loading}
      >
        {loading ? (
          <ActivityIndicator color="#0a0a0a" />
        ) : (
          <Text style={styles.buttonText}>Salvar e Voltar ao Menu</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  title: {
    color: '#00ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  regionText: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },
  label: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    textAlignVertical: 'top',
    minHeight: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00ffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  disabledButton: {
    backgroundColor: '#1a3a3a',
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});