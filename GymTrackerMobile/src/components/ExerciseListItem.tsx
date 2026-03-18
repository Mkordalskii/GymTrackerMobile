//Pojedynczy element listy cwiczen
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {ExerciseItem} from '../data/mockData';

type ExerciseListItemProps = {
  item: ExerciseItem;
};

export function ExerciseListItem({item}: ExerciseListItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>
          {item.category} | {item.difficulty}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.iconAction}>
          <Text style={styles.iconActionText}>E</Text>
        </Pressable>
        <Pressable style={[styles.iconAction, styles.deleteAction]}>
          <Text style={styles.deleteActionText}>U</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  main: {
    flex: 1,
  },
  title: {
    color: '#1F241F',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  meta: {
    color: '#6D6A63',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D9EFE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconActionText: {
    color: '#1F8A70',
    fontSize: 12,
    fontWeight: '800',
  },
  deleteAction: {
    backgroundColor: '#F6D8D0',
  },
  deleteActionText: {
    color: '#B0462B',
    fontSize: 12,
    fontWeight: '800',
  },
});
