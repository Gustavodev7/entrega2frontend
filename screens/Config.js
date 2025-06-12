import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Config() {
  var  [url, setUrl] = useState('');

  useEffect(() => {
    async function loadUrl() {
      const savedUrl = await AsyncStorage.getItem('apiUrl');
      if (savedUrl) {
        setUrl(savedUrl);
      }
    }
    loadUrl();
  }, []);

  async function save() {
    try {
      await AsyncStorage.setItem('apiUrl', url);
      Alert.alert('Configurações', `URL salva:\n${url}`);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a URL');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>URL da API:</Text>
      <TextInput
        style={styles.input}
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />
      <View style={styles.button}>
        <Button title="Salvar" onPress={save} color="#00838f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#006064',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#4dd0e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    color: '#004d40',
  },
  button: {
    marginTop: 12,
    width: '100%',
    borderRadius: 8,
  }
});

/**
 * Integração com a API da Sprint 2:
 * - Esta tela permite que o usuário digite e salve a URL da API (ex: http://192.168.0.102:8080/api/readings).
 * - Essa URL é armazenada localmente usando AsyncStorage com a chave 'apiUrl'.
 */
//como integrar api p sprint 2 **