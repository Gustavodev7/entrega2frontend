import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

export default function SensorDetail({ route }) {
  const { sensor } = route.params;

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentReading, setCurrentReading] = useState(sensor);

  const sensorId = sensor.sensorId;

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const storedBaseUrl = await AsyncStorage.getItem('apiUrl');

      if (!storedBaseUrl) {
        Alert.alert('Configuração necessária', 'Defina a URL da API nas configurações.');
        setHistory([]);
        return;
      }

      const baseUrl = storedBaseUrl.replace(/\/$/, '');
      const response = await axios.get(`${baseUrl}/api/readings`, {
        params: { sensorId },
      });

      const readings = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.content)
        ? response.data.content
        : [];

      const normalized = readings
        .map((reading) => ({
          ...reading,
          readingValue: reading.readingValue ?? reading.value ?? 0,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setHistory(normalized);

      if (normalized.length > 0) {
        const latest = normalized[normalized.length - 1];
        setCurrentReading((prev) => ({
          ...prev,
          readingValue: latest.readingValue,
          timestamp: latest.timestamp,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico do sensor:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico do sensor.');
    } finally {
      setLoading(false);
    }
  }, [sensorId]);

  useEffect(() => {
    setCurrentReading(sensor);
    fetchHistory();
  }, [sensor, fetchHistory]);

  const handleRefresh = () => {
    fetchHistory();
  };

  const handleRegisterReading = async () => {
    try {
      const storedBaseUrl = await AsyncStorage.getItem('apiUrl');
      if (!storedBaseUrl) {
        Alert.alert('Configuração necessária', 'Defina a URL da API nas configurações.');
        return;
      }

      const baseUrl = storedBaseUrl.replace(/\/$/, '');
      const newReading = {
        sensorId,
        value: Number((Math.random() * 100).toFixed(2)),
        timestamp: new Date().toISOString(),
      };

      await axios.post(`${baseUrl}/api/readings`, newReading);
      Alert.alert('Sucesso', 'Leitura registrada com sucesso!');
      fetchHistory();
    } catch (error) {
      console.error('Erro ao registrar leitura:', error);
      Alert.alert('Erro', 'Não foi possível registrar a leitura.');
    }
  };

  const chartData = history.map((reading, index) => ({
    x: index + 1,
    y: Number(reading.readingValue ?? 0),
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{sensorId}</Text>
      <Text style={styles.item}>Valor atual: {currentReading?.readingValue ?? '-'}</Text>
      <Text style={styles.item}>
        Horário: {currentReading?.timestamp ? new Date(currentReading.timestamp).toLocaleString() : '-'}
      </Text>

      <View style={styles.buttonGroup}>
        <View style={styles.buttonWrapper}>
          <Button title="Atualizar" onPress={handleRefresh} color="#00838f" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Registrar Leitura" onPress={handleRegisterReading} color="#00695c" />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00838f" style={styles.loader} />
      ) : history.length > 0 ? (
        <VictoryChart theme={VictoryTheme.material} domainPadding={16}>
          <VictoryLine
            interpolation="monotoneX"
            data={chartData}
            style={{ data: { stroke: '#00838f', strokeWidth: 3 } }}
          />
        </VictoryChart>
      ) : (
        <Text style={styles.emptyText}>Nenhum histórico disponível.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#e0f7fa',
    alignItems: 'stretch',
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
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  loader: {
    marginTop: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#004d40',
    marginTop: 24,
  },
});
