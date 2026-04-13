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
import {AuthSession, WorkoutPlanDto} from '../types/api';
import {formatDate} from '../utils/format';

type PlansScreenProps = {
  session: AuthSession;
};

export function PlansScreen({session}: PlansScreenProps) {
  const [plans, setPlans] = useState<WorkoutPlanDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlanDto | null>(null);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const items = await gymApi.getWorkoutPlans(session.token);
      setPlans(items);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac planow.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const ownPlans = useMemo(() => {
    return plans.filter(item => item.userId === session.userId);
  }, [plans, session.userId]);

  const resetForm = () => {
    setName('');
    setGoal('');
    setEditingPlan(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalVisible(true);
  };

  const openEditModal = (plan: WorkoutPlanDto) => {
    setEditingPlan(plan);
    setName(plan.name);
    setGoal(plan.goal || '');
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (editingPlan) {
        await gymApi.updateWorkoutPlan(session.token, editingPlan.id, {
          id: editingPlan.id,
          userId: editingPlan.userId,
          name,
          goal: goal || null,
          createdAt: editingPlan.createdAt,
        });
      } else {
        await gymApi.createWorkoutPlan(session.token, {
          userId: session.userId,
          name,
          goal: goal || null,
          createdAt: new Date().toISOString(),
        });
      }
      setIsModalVisible(false);
      resetForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie utworzyc planu.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await gymApi.deleteWorkoutPlan(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac planu.',
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
        <SectionTitle title="Twoje plany" />
        <PrimaryButton title="+ Dodaj" onPress={openCreateModal} />
      </View>

      {ownPlans.length === 0 ? (
        <EmptyState
          title="Brak planow"
          description="Dodaj pierwszy plan treningowy dla zalogowanego uzytkownika."
        />
      ) : (
        ownPlans.map(item => (
          <ResourceCard
            key={item.id}
            title={item.name}
            description={item.goal || 'Bez dodatkowego celu'}
            meta={`Utworzono ${formatDate(item.createdAt)}`}
            onEdit={() => openEditModal(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))
      )}

      <ModalCard
        visible={isModalVisible}
        title={editingPlan ? 'Edytuj plan' : 'Nowy plan'}
        onClose={() => {
          setIsModalVisible(false);
          resetForm();
        }}>
        <ScrollView>
          <FormField
            label="Nazwa planu"
            value={name}
            onChangeText={setName}
            placeholder="FBW 3 dni"
          />
          <FormField
            label="Cel"
            value={goal}
            onChangeText={setGoal}
            placeholder="Redukcja / Masa / Sila"
            multiline
          />
          <PrimaryButton
            title={
              isSubmitting
                ? 'Zapisywanie...'
                : editingPlan
                  ? 'Zapisz zmiany'
                  : 'Zapisz plan'
            }
            onPress={handleSubmit}
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
