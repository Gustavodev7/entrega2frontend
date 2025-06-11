import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import Sensor from '../components/Sensor';
import originalData from '../mock/sensors.json';

export default function ListaSensor({ navigation }) {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    // Função que simula novos valores a cada intervalo
    function refreshSensors() {
      const updated = originalData.map(s => {
        // variação aleatória no value
        const newValue = parseFloat(
          (s.value + (Math.random() * 4 - 2)).toFixed(1)
        );
        // simula mudança de status com pequena probabilidade
        const newStatus =
          newValue > s.value + 1
            ? 'Alerta'
            : newValue < s.value - 1
            ? 'Alerta'
            : 'OK';

        return {
          ...s,
          value: newValue,
          status: newStatus,
        };
      });
      setSensors(updated);
    }

   
    refreshSensors();
    
    const intervalId = setInterval(refreshSensors, 10000);

    
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
      <FlatList
        data={sensors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Sensor
            item={item}
            onPress={() =>
              navigation.navigate('SensorDetail', { sensor: item })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    padding: 16,
  },
});