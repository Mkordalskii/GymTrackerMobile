import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type ResourceCardProps = {
  title: string;
  description: string;
  meta?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ResourceCard({
  title,
  description,
  meta,
  onEdit,
  onDelete,
}: ResourceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      <View style={styles.actions}>
        {onEdit ? (
          <Pressable onPress={onEdit} style={styles.editButton}>
            <Text style={styles.editText}>Edytuj</Text>
          </Pressable>
        ) : null}
        {onDelete ? (
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Usun</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
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
  description: {
    color: '#6D6A63',
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    color: '#494741',
    fontSize: 13,
    marginTop: 10,
    fontWeight: '700',
  },
  actions: {
    alignSelf: 'flex-start',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#D7EEDF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editText: {
    color: '#1A6E58',
    fontSize: 12,
    fontWeight: '800',
  },
  deleteButton: {
    backgroundColor: '#F8D8D2',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteText: {
    color: '#B0462B',
    fontSize: 12,
    fontWeight: '800',
  },
});
