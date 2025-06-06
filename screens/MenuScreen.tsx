import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  return (
    
      <LinearGradient
        colors={['rgba(10, 10, 10, 0.8)', 'rgba(20, 20, 20, 0.9)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Energia Segura</Text>
          <Text style={styles.subtitle}>Monitoramento de Falta de Energia</Text>

          <View style={styles.buttonContainer}>
            {/* Botão Eventos */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Eventos')}
            >
              <Text style={styles.buttonIcon}>⚡</Text>
              <Text style={styles.buttonText}>Eventos Registrados</Text>
            </TouchableOpacity>

            {/* Botão Regiões */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Regioes')}
            >
              <Text style={styles.buttonIcon}>📍</Text>
              <Text style={styles.buttonText}>Cadastrar Região</Text>
            </TouchableOpacity>

            {/* Novo Botão Recomendações */}
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Recomendacoes')}
            >
              <Text style={styles.buttonIcon}>📋</Text>
              <Text style={styles.buttonText}>Recomendações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#00ffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 15,
    color: '#00ffff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});