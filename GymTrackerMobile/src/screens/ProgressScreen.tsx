import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';

import {gymApi} from '../api/gym';
import {EmptyState} from '../components/EmptyState';
import {FormField} from '../components/FormField';
import {MessageBanner} from '../components/MessageBanner';
import {ModalCard} from '../components/ModalCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {ResourceCard} from '../components/ResourceCard';
import {SelectField} from '../components/SelectField';
import {SectionTitle} from '../components/SectionTitle';
import {AuthSession, ExerciseDto, ProgressEntryDto} from '../types/api';
import {formatDateTime} from '../utils/format';

type ProgressScreenProps = {
  session: AuthSession;
};

export function ProgressScreen({session}: ProgressScreenProps) {
  const [entries, setEntries] = useState<ProgressEntryDto[]>([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exerciseId, setExerciseId] = useState('');
  const [weight, setWeight] = useState('60');
  const [reps, setReps] = useState('8');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [progressItems, exerciseItems] = await Promise.all([
        gymApi.getProgressEntries(session.token),
        gymApi.getExercises(session.token),
      ]);
      setEntries(progressItems);
      setExercises(exerciseItems);
      if (exerciseItems[0]) {
        setExerciseId(String(exerciseItems[0].id));
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac postepow.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const ownEntries = useMemo(() => {
    return entries
      .filter(item => item.userId === session.userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [entries, session.userId]);

  const exerciseOptions = useMemo(
    () => exercises.map(item => ({value: String(item.id), label: item.name})),
    [exercises],
  );

  const handleCreate = async () => {
    if (!exerciseId) {
      setError('Wybierz cwiczenie.');
      return;
    }

    setIsSubmitting(true);

    try {
      await gymApi.createProgressEntry(session.token, {
        userId: session.userId,
        exerciseId: Number(exerciseId),
        weight: Number(weight),
        reps: Number(reps),
        createdAt: new Date().toISOString(),
        comment: comment || null,
      });
      setIsModalVisible(false);
      setWeight('60');
      setReps('8');
      setComment('');
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie dodac wpisu progresu.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await gymApi.deleteProgressEntry(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac wpisu progresu.',
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1F8A70" />;
  }

  return (
    <View>
      {error ? <MessageBanner tone="error" text={error} /> : null}

      <View style={styles.headerRow}>
        <SectionTitle title="Historia progresu" />
        <PrimaryButton title="+ Dodaj" onPress={() => setIsModalVisible(true)} />
      </View>

      {ownEntries.length === 0 ? (
        <EmptyState
          title="Brak wpisow"
          description="Dodaj pierwszy wpis progresu po treningu."
        />
      ) : (
        ownEntries.map(item => (
          <ResourceCard
            key={item.id}
            title={
              exercises.find(exercise => exercise.id === item.exerciseId)?.name ||
              `Cwiczenie #${item.exerciseId}`
            }
            description={item.comment || 'Bez komentarza'}
            meta={`${item.weight} kg | ${item.reps} powt. | ${formatDateTime(
              item.createdAt,
            )}`}
            onDelete={() => handleDelete(item.id)}
          />
        ))
      )}

      <ModalCard
        visible={isModalVisible}
        title="Nowy wpis progresu"
        onClose={() => setIsModalVisible(false)}>
        <ScrollView>
          <SelectField
            label="Cwiczenie"
            value={exerciseId}
            onChange={setExerciseId}
            options={exerciseOptions}
            emptyMessage="Brak cwiczen. Najpierw dodaj cwiczenie."
          />
          <FormField
            label="Ciezar (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <FormField
            label="Powtorzenia"
            value={reps}
            onChangeText={setReps}
            keyboardType="numeric"
          />
          <FormField
            label="Komentarz"
            value={comment}
            onChangeText={setComment}
            placeholder="Jak czules trening"
            multiline
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz progres'}
            onPress={handleCreate}
            disabled={isSubmitting || !exerciseId}
          />
        </ScrollView>
      </ModalCard>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
});
