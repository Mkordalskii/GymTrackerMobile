//Mala etykieta np. z info 55 min 7 cwiczen
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type BadgeProps = {
  label: string;
};

export function Badge({label}: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: '#E7E1D5',
  },
  text: {
    color: '#1F241F',
    fontSize: 12,
    fontWeight: '700',
  },
});
