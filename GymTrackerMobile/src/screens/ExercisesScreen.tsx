import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {ExerciseListItem} from '../components/ExerciseListItem';
import {FilterChip} from '../components/FilterChip';
import {SearchInput} from '../components/SearchInput';
import {SectionTitle} from '../components/SectionTitle';
import {ExerciseFilter, ExerciseItem, filters} from '../data/mockData';

type ExercisesScreenProps = {
  filteredExercises: ExerciseItem[];
  searchText: string;
  selectedFilter: ExerciseFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ExerciseFilter) => void;
};

export function ExercisesScreen({
  filteredExercises,
  searchText,
  selectedFilter,
  onSearchChange,
  onFilterChange,
}: ExercisesScreenProps) {
  return (
    <View>
      <SearchInput value={searchText} onChangeText={onSearchChange} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}>
        {filters.map(filter => (
          <FilterChip
            key={filter}
            label={filter}
            isActive={filter === selectedFilter}
            onPress={() => onFilterChange(filter)}
          />
        ))}
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.headerRow}>
          <SectionTitle title="Lista cwiczen" />
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Dodaj</Text>
          </Pressable>
        </View>

        {filteredExercises.map(item => (
          <ExerciseListItem key={item.id} item={item} />
        ))}

        {filteredExercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Brak wynikow</Text>
            <Text style={styles.emptyStateText}>
              Zmien filtr albo wpisz inna nazwe cwiczenia.
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersRow: {
    paddingTop: 16,
    paddingBottom: 4,
    gap: 10,
  },
  section: {
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    backgroundColor: '#1F8A70',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emptyState: {
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 20,
    marginTop: 8,
  },
  emptyStateTitle: {
    color: '#1F241F',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptyStateText: {
    color: '#6D6A63',
    fontSize: 14,
    lineHeight: 20,
  },
});
