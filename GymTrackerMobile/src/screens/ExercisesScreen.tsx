import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {gymApi} from '../api/gym';
import {EmptyState} from '../components/EmptyState';
import {FormField} from '../components/FormField';
import {MessageBanner} from '../components/MessageBanner';
import {ModalCard} from '../components/ModalCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {ResourceCard} from '../components/ResourceCard';
import {SearchInput} from '../components/SearchInput';
import {SelectField} from '../components/SelectField';
import {SectionTitle} from '../components/SectionTitle';
import {AuthSession, ExerciseCategoryDto, ExerciseDto} from '../types/api';

type ExercisesScreenProps = {
  session: AuthSession;
};

export function ExercisesScreen({session}: ExercisesScreenProps) {
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [categories, setCategories] = useState<ExerciseCategoryDto[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Medium');
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [exerciseItems, categoryItems] = await Promise.all([
        gymApi.getExercises(session.token),
        gymApi.getExerciseCategories(session.token),
      ]);

      setExercises(exerciseItems);
      setCategories(categoryItems);
      if (categoryItems[0]) {
        setCategoryId(String(categoryItems[0].id));
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac cwiczen.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const filteredExercises = useMemo(() => {
    return exercises.filter(item =>
      item.name.toLowerCase().includes(searchText.trim().toLowerCase()),
    );
  }, [exercises, searchText]);

  const categoryOptions = useMemo(
    () => categories.map(item => ({value: String(item.id), label: item.name})),
    [categories],
  );

  const difficultyOptions = useMemo(
    () => [
      {value: 'Easy', label: 'Latwy'},
      {value: 'Medium', label: 'Sredni'},
      {value: 'Hard', label: 'Trudny'},
    ],
    [],
  );

  const resetForm = () => {
    setName('');
    setDescription('');
    setDifficultyLevel('Medium');
  };

  const handleCreate = async () => {
    if (!categoryId) {
      setError('Wybierz kategorie cwiczenia.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await gymApi.createExercise(session.token, {
        name,
        description: description || null,
        difficultyLevel,
        categoryId: Number(categoryId),
      });

      setIsModalVisible(false);
      resetForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie dodac cwiczenia.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await gymApi.deleteExercise(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac cwiczenia.',
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1F8A70" />;
  }

  return (
    <View>
      {error ? <MessageBanner tone="error" text={error} /> : null}

      <SearchInput value={searchText} onChangeText={setSearchText} />

      <View style={styles.section}>
        <View style={styles.headerRow}>
          <SectionTitle title="Lista cwiczen" />
          <PrimaryButton
            title="+ Dodaj"
            onPress={() => setIsModalVisible(true)}
          />
        </View>

        {filteredExercises.length === 0 ? (
          <EmptyState
            title="Brak cwiczen"
            description="Dodaj pierwsze cwiczenie albo zmien fraze wyszukiwania."
          />
        ) : (
          filteredExercises.map(item => (
            <ResourceCard
              key={item.id}
              title={item.name}
              description={item.description || item.categoryName}
              meta={`${item.categoryName} | ${item.difficultyLevel}`}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
      </View>

      <ModalCard
        visible={isModalVisible}
        title="Nowe cwiczenie"
        onClose={() => setIsModalVisible(false)}>
        <ScrollView>
          <FormField
            label="Nazwa"
            value={name}
            onChangeText={setName}
            placeholder="Bench Press"
          />
          <FormField
            label="Opis"
            value={description}
            onChangeText={setDescription}
            placeholder="Krotki opis cwiczenia"
            multiline
          />
          <SelectField
            label="Poziom trudnosci"
            value={difficultyLevel}
            onChange={setDifficultyLevel}
            options={difficultyOptions}
          />
          <SelectField
            label="Kategoria"
            value={categoryId}
            onChange={setCategoryId}
            options={categoryOptions}
            emptyMessage="Brak kategorii. Dodaj kategorie cwiczen w API."
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz cwiczenie'}
            onPress={handleCreate}
            disabled={isSubmitting || !categoryId}
          />
        </ScrollView>
      </ModalCard>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
});
