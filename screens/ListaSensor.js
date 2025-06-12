import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ListaSensor({ navigation }) {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    async function carregarSensores() {
      try {
        const apiUrl = await AsyncStorage.getItem('apiUrl');
        if (!apiUrl) return;

        const res = await axios.get(apiUrl);
        setSensors(res.data);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
      }
    }

    carregarSensores();
    const intervalId = setInterval(carregarSensores, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Button
          title="Configurações"
          onPress={() => navigation.navigate('Config')}
          color="#00838f"
        />
      </View>
      {sensors.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum sensor disponível</Text>
      ) : (
        <FlatList
          data={sensors}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const status = item.readingValue > 50 ? 'ALERTA' : 'OK';
            const statusColor = status === 'OK' ? '#2e7d32' : '#c62828';

            return (
              <TouchableOpacity
                style={styles.sensorContainer}
                onPress={() => navigation.navigate('SensorDetail', { sensor: item })}
              >
                <Text style={styles.sensorText}>Nome: {item.sensorId}</Text>
                <Text style={styles.sensorText}>Valor: {item.readingValue}</Text>
                <Text style={styles.sensorText}>Horário: {new Date(item.timestamp).toLocaleString()}</Text>
                <Text style={[styles.sensorText, { color: statusColor }]}>Status: {status}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 16,
  },
  sensorContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#00838f',
    borderWidth: 1,
  },
  sensorText: {
    fontSize: 16,
    marginBottom: 4,
  },
});