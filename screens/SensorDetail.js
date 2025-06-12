import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorDetail({ route }) {
  const { sensor } = route.params;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (sensor.readingValue) {
      const base = sensor.readingValue;
      const valores = Array.from({ length: 5 }, (_, i) => base + (Math.random() * 4 - 2));
      setHistory(valores);
    }
  }, [sensor]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{sensor.sensorId}</Text>
      <Text style={styles.item}>Valor atual: {sensor.readingValue}</Text>
      <Text style={styles.item}>Horário: {new Date(sensor.timestamp).toLocaleString()}</Text>
      {history.map((valor, index) => (
        <Text key={index} style={styles.item}>
          {`Valor ${index + 1}: ${valor.toFixed(1)}`}
        </Text>
      ))}
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