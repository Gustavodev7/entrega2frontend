import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Splash({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
          onPress={() => navigation.replace('ListaSensor')}
          color="#00838f"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    color: '#006064',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});