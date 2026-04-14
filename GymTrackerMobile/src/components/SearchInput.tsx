//Pole do wpisywania tekstu, np. do wyszukiwania cwiczen
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchInput({value, onChangeText}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Szukaj"
        placeholderTextColor="#7A7A85"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7E8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    fontSize: 15,
    color: '#1F241F',
    paddingVertical: 12,
  },
});
