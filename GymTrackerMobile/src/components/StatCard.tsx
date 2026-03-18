//karta np. Aktywny plan, Ostatni trening, itp. z duzym napisem i mniejszym opisem
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({label, value}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 16,
    minHeight: 102,
  },
  label: {
    color: '#6D6A63',
    fontSize: 13,
    marginBottom: 14,
  },
  value: {
    color: '#1F241F',
    fontSize: 22,
    fontWeight: '800',
  },
});
