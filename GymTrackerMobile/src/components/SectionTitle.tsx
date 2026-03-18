//tytuly sekcji np. "Szybkie akcje", "Twoje podsumowanie" itp.
import React from 'react';
import {StyleSheet, Text} from 'react-native';

type SectionTitleProps = {
  title: string;
};

export function SectionTitle({title}: SectionTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F241F',
    marginBottom: 14,
  },
});
