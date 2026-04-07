import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';

import {gymApi} from '../api/gym';
import {EmptyState} from '../components/EmptyState';
import {FormField} from '../components/FormField';
import {MessageBanner} from '../components/MessageBanner';
import {ModalCard} from '../components/ModalCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {ResourceCard} from '../components/ResourceCard';
import {SectionTitle} from '../components/SectionTitle';
import {AuthSession, WorkoutPlanDto, WorkoutSessionDto} from '../types/api';
import {formatDateTime} from '../utils/format';

type SessionsScreenProps = {
  session: AuthSession;
};

export function SessionsScreen({session}: SessionsScreenProps) {
  const [sessions, setSessions] = useState<WorkoutSessionDto[]>([]);
  const [plans, setPlans] = useState<WorkoutPlanDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workoutPlanId, setWorkoutPlanId] = useState('1');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [sessionItems, planItems] = await Promise.all([
        gymApi.getWorkoutSessions(session.token),
        gymApi.getWorkoutPlans(session.token),
      ]);
      setSessions(sessionItems);
      setPlans(planItems);
      const firstOwnPlan = planItems.find(item => item.userId === session.userId);
      if (firstOwnPlan) {
        setWorkoutPlanId(String(firstOwnPlan.id));
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac sesji.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token, session.userId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const ownSessions = useMemo(() => {
    return sessions
      .filter(item => item.userId === session.userId)
      .sort(
        (a, b) =>
          new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime(),
      );
  }, [session.userId, sessions]);

  const handleCreate = async () => {
    setIsSubmitting(true);

    try {
      await gymApi.createWorkoutSession(session.token, {
        userId: session.userId,
        workoutPlanId: Number(workoutPlanId),
        sessionDate: new Date().toISOString(),
        durationMinutes: Number(durationMinutes),
        notes: notes || null,
      });
      setIsModalVisible(false);
      setDurationMinutes('45');
      setNotes('');
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie zapisac sesji.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await gymApi.deleteWorkoutSession(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac sesji.',
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
        <SectionTitle title="Historia sesji" />
        <PrimaryButton title="+ Dodaj" onPress={() => setIsModalVisible(true)} />
      </View>

      {ownSessions.length === 0 ? (
        <EmptyState
          title="Brak sesji"
          description="Dodaj pierwsza zakonczona sesje treningowa."
        />
      ) : (
        ownSessions.map(item => (
          <ResourceCard
            key={item.id}
            title={`Plan #${item.workoutPlanId}`}
            description={item.notes || 'Bez notatek'}
            meta={`${formatDateTime(item.sessionDate)} | ${item.durationMinutes} min`}
            onDelete={() => handleDelete(item.id)}
          />
        ))
      )}

      <ModalCard
        visible={isModalVisible}
        title="Nowa sesja"
        onClose={() => setIsModalVisible(false)}>
        <ScrollView>
          <FormField
            label="Id planu"
            value={workoutPlanId}
            onChangeText={setWorkoutPlanId}
            keyboardType="numeric"
            placeholder={plans
              .filter(item => item.userId === session.userId)
              .map(item => `${item.id}:${item.name}`)
              .join(', ')}
          />
          <FormField
            label="Czas trwania (min)"
            value={durationMinutes}
            onChangeText={setDurationMinutes}
            keyboardType="numeric"
          />
          <FormField
            label="Notatki"
            value={notes}
            onChangeText={setNotes}
            placeholder="Jak poszedl trening"
            multiline
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz sesje'}
            onPress={handleCreate}
            disabled={isSubmitting}
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
