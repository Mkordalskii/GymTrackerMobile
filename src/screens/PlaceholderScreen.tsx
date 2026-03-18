import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {TabKey} from '../data/navigation';

type PlaceholderScreenProps = {
  tab: TabKey;
};

const labels: Record<TabKey, string> = {
  home: 'Home',
  plans: 'Plany',
  exercises: 'Cwiczenia',
  progress: 'Postepy',
  profile: 'Profil',
};

export function PlaceholderScreen({tab}: PlaceholderScreenProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{labels[tab]}</Text>
      <Text style={styles.text}>
        Ta zakladka jest przygotowana pod kolejne etapy projektu. Na ten moment
        glowny layout oraz widoki Home i Cwiczenia sa juz gotowe.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7E8',
    borderRadius: 28,
    padding: 24,
    marginTop: 12,
  },
  title: {
    color: '#1F241F',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  text: {
    color: '#6D6A63',
    fontSize: 15,
    lineHeight: 22,
  },
});
