import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function Sensor({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={[styles.status, item.status === 'Alerta' && styles.alert]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#b2ebf2',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006064',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#004d40',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: 'green',
  },
  alert: {
    color: 'red',
  }
});