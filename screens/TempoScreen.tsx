import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { saveEvent } from '../services/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type TempoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tempo'>;
type RouteParams = {
  regionId: string;
  regionName: string;
};

export default function TempoScreen() {
  const navigation = useNavigation<TempoScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as RouteParams;

  const [duration, setDuration] = useState('');
  const [timeUnit, setTimeUnit] = useState('horas');
  const [isEstimated, setIsEstimated] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!duration) {
      Alert.alert('Atenção', 'Informe a duração da interrupção');
      return;
    }

    setLoading(true);

    try {
      await saveEvent({
        id: params.regionId,
        duration: `${duration} ${timeUnit} (${isEstimated ? 'estimado' : 'confirmado'})`,
        date: new Date().toLocaleDateString('pt-BR')
      });

      navigation.navigate('Prejuizos', {
        regionId: params.regionId,
        regionName: params.regionName
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a duração');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tempo de Interrupção</Text>
      <Text style={styles.regionText}>{params.regionName}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duração*:</Text>
        <View style={styles.durationContainer}>
          <TextInput
            style={styles.durationInput}
            value={duration}
            onChangeText={setDuration}
            placeholder="Ex: 2"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={timeUnit}
              onValueChange={setTimeUnit}
              dropdownIconColor="#00ffff"
              dropdownIconRippleColor="#333"
              mode="dropdown"
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Horas" value="horas" />
              <Picker.Item label="Minutos" value="minutos" />
              <Picker.Item label="Dias" value="dias" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isEstimated && styles.activeToggle]}
          onPress={() => setIsEstimated(true)}
        >
          <Text style={[styles.toggleText, isEstimated && styles.activeText]}>Estimado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isEstimated && styles.activeToggle]}
          onPress={() => setIsEstimated(false)}
        >
          <Text style={[styles.toggleText, !isEstimated && styles.activeText]}>Confirmado</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, (!duration || loading) && styles.disabledButton]}
        onPress={handleSave}
        disabled={!duration || loading}
      >
        {loading ? (
          <ActivityIndicator color="#0a0a0a" />
        ) : (
          <Text style={styles.buttonText}>Avançar para Prejuízos</Text>
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
    paddingTop: 40,
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
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  durationInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: {
    color: '#ffffff',
    backgroundColor: '#1a1a1a',
    height: 50,
  },
  pickerItem: {
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: '#1a1a1a',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#00ffff',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  activeText: {
    color: '#0a0a0a',
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