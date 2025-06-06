import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getEvents, removeEvent } from '../services/storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import type { Event } from '../services/storage'; // Importe o tipo Event

type EventosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Eventos'>;

export default function EventosScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<EventosScreenNavigationProp>();

  const loadEvents = async () => {
    try {
      const storedEvents = await getEvents();
      setEvents(storedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadEvents);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id: string) => {
    try {
      await removeEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de Falta de Energia</Text>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum evento registrado</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Regioes')}
          >
            <Text style={styles.buttonText}>Cadastrar Primeiro Evento</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.regionText}>{event.region}, {event.city}</Text>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDelete(event.id)}
                >
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
              </View>
              
              {event.cep && <Text style={styles.detailText}>CEP: {event.cep}</Text>}
              <Text style={styles.detailText}>Data: {event.date}</Text>
              {event.duration && <Text style={styles.detailText}>Duração: {event.duration}</Text>}
              {event.damages && (
                <View style={styles.damagesContainer}>
                  <Text style={styles.damagesTitle}>Prejuízos:</Text>
                  <Text style={styles.damagesText}>{event.damages}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  title: {
    color: '#00ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00ffff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  regionText: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  detailText: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 5,
  },
  damagesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  damagesTitle: {
    color: '#ff5555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  damagesText: {
    color: '#eee',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#00ffff',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff5555',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});