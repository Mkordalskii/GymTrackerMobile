//Przycisk kategorii cwiczen, np. "Klatka", "Barki", "Nogi" itp.
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type FilterChipProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function FilterChip({label, isActive, onPress}: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, isActive ? styles.chipActive : undefined]}>
      <Text style={[styles.text, isActive ? styles.textActive : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E7E1D5',
  },
  chipActive: {
    backgroundColor: '#1F8A70',
  },
  text: {
    color: '#494741',
    fontSize: 13,
    fontWeight: '700',
  },
  textActive: {
    color: '#FFFFFF',
  },
});
