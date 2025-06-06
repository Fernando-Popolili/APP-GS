import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const recommendations = [
  {
    title: "Antes da Tempestade",
    items: [
      "Tenha lanternas e pilhas extras",
      "Carregue dispositivos eletrônicos",
      "Tenha um rádio à pilha",
      "Conheça o local de desligamento do quadro de energia"
    ]
  },
  {
    title: "Durante a Falta de Energia",
    items: [
      "Desligue aparelhos eletrônicos sensíveis",
      "Mantenha a porta da geladeira fechada",
      "Use velas com cuidado",
      "Evite usar elevadores"
    ]
  },
  {
    title: "Após o Retorno da Energia",
    items: [
      "Aguarde alguns minutos antes de religar aparelhos",
      "Verifique se há cheiro de queimado",
      "Cheque a temperatura de alimentos perecíveis",
      "Reporte danos à concessionária"
    ]
  }
];

export default function RecomendacoesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações</Text>
      
      {recommendations.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0a0a0a',
  },
  title: {
    color: '#00ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: '#00ffff',
    marginRight: 10,
  },
  itemText: {
    color: '#fff',
    flex: 1,
  },
});