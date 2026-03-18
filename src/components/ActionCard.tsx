import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type ActionCardProps = {
  title: string;
  subtitle: string;
};

export function ActionCard({title, subtitle}: ActionCardProps) {
  return (
    <Pressable style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D95D39',
    borderRadius: 24,
    padding: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: '#FFF3ED',
    fontSize: 14,
    lineHeight: 20,
  },
});
