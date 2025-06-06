import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipagem completa do evento
export type Event = {
  id: string;
  region: string;
  city: string;
  cep?: string;
  duration?: string;
  damages?: string;
  date: string;
};

// Salva ou atualiza um evento (mescla dados parciais)
export const saveEvent = async (partialEvent: Partial<Event>) => {
  try {
    const events = await getEvents();
    const existingIndex = events.findIndex(e => e.id === partialEvent.id);

    if (existingIndex >= 0) {
      // Atualiza evento existente mantendo dados anteriores
      events[existingIndex] = { 
        ...events[existingIndex], 
        ...partialEvent,
        date: partialEvent.date || events[existingIndex].date
      };
    } else {
        
      // Cria novo evento se não existir (com validação de campos obrigatórios)
      if (partialEvent.region && partialEvent.city) {
        events.push({
          id: partialEvent.id || Date.now().toString(),
          region: partialEvent.region,
          city: partialEvent.city,
          cep: partialEvent.cep,
          duration: partialEvent.duration,
          damages: partialEvent.damages,
          date: partialEvent.date || new Date().toLocaleDateString('pt-BR')
        });
      }
    }

    await AsyncStorage.setItem('powerOutageEvents', JSON.stringify(events));
  } catch (e) {
    console.error('Erro ao salvar evento:', e);
    throw new Error('Falha ao salvar os dados');
  }
};

// Recupera todos os eventos
export const getEvents = async (): Promise<Event[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('powerOutageEvents');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar eventos:', e);
    return [];
  }
};

// Busca um evento específico por ID
export const getEventById = async (id: string): Promise<Event | undefined> => {
  const events = await getEvents();
  return events.find(event => event.id === id);
};

// Remove um evento pelo ID
export const removeEvent = async (id: string) => {
  try {
    const events = await getEvents();
    const updatedEvents = events.filter(event => event.id !== id);
    await AsyncStorage.setItem('powerOutageEvents', JSON.stringify(updatedEvents));
  } catch (e) {
    console.error('Erro ao remover evento:', e);
    throw new Error('Falha ao excluir o registro');
  }
};

// Limpa todos os dados (para testes/debug)
export const clearAllEvents = async () => {
  try {
    await AsyncStorage.removeItem('powerOutageEvents');
  } catch (e) {
    console.error('Erro ao limpar dados:', e);
  }
};

// Função auxiliar para buscar regiões formatadas
export const getFormattedRegions = async () => {
  const events = await getEvents();
  return events.map(event => ({
    id: event.id,
    label: `${event.region}, ${event.city}${event.cep ? ` (${event.cep})` : ''}`,
    value: event.id
  }));
};