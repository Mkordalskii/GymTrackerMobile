import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({title, description}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 20,
  },
  title: {
    color: '#1F241F',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    color: '#6D6A63',
    fontSize: 14,
    lineHeight: 20,
  },
});
