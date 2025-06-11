import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

export default function SensorDetail({ route }) {
  const { sensor } = route.params;
  const [history, setHistory] = useState(sensor.history);

  function refresh() {
    const novas = history.map(val => val + (Math.random() * 2 - 1));
    setHistory(novas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{sensor.name}</Text>
      <FlatList
        data={history}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.toFixed(1)}</Text>
        )}
      />
      <Button title="Atualizar" onPress={refresh} color="#00838f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0f7fa',
  },
  name: {
    fontSize: 22,
    marginBottom: 16,
    color: '#006064',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    fontSize: 16,
    paddingVertical: 6,
    color: '#004d40',
    textAlign: 'center',
  }
});