import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {gymApi} from '../api/gym';
import {ActionCard} from '../components/ActionCard';
import {Badge} from '../components/Badge';
import {MessageBanner} from '../components/MessageBanner';
import {SectionTitle} from '../components/SectionTitle';
import {StatCard} from '../components/StatCard';
import type {AuthSession, TabKey, WorkoutSessionDto} from '../types/api';
import {formatDate} from '../utils/format';

type HomeScreenProps = {
  session: AuthSession;
  onNavigate: (tab: TabKey) => void;
};

export function HomeScreen({session, onNavigate}: HomeScreenProps) {
  const [plansCount, setPlansCount] = useState(0);
  const [exercisesCount, setExercisesCount] = useState(0);
  const [latestSession, setLatestSession] = useState<WorkoutSessionDto | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [plans, exercises, sessions] = await Promise.all([
        gymApi.getWorkoutPlans(session.token),
        gymApi.getExercises(session.token),
        gymApi.getWorkoutSessions(session.token),
      ]);

      const ownPlans = plans.filter(item => item.userId === session.userId);
      const ownSessions = sessions
        .filter(item => item.userId === session.userId)
        .sort(
          (a, b) =>
            new Date(b.sessionDate).getTime() -
            new Date(a.sessionDate).getTime(),
        );

      setPlansCount(ownPlans.length);
      setExercisesCount(exercises.length);
      setLatestSession(ownSessions[0] ?? null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac danych dashboardu.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token, session.userId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  if (loading) {
    return <ActivityIndicator size="large" color="#1F8A70" />;
  }

  return (
    <View>
      {error ? <MessageBanner tone="error" text={error} /> : null}

      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Witaj, {session.email}</Text>
        </View>
        <Text style={styles.heroTitle}>Twoje dane sa juz zsynchronizowane</Text>
        <Text style={styles.heroSubtitle}>
          Frontend pobiera teraz prawdziwe informacje z backendu .NET.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Twoje podsumowanie" />
        <View style={styles.statsGrid}>
          <StatCard label="Twoje plany" value={String(plansCount)} />
          <StatCard label="Dostepne cwiczenia" value={String(exercisesCount)} />
          <StatCard label="Rola" value={session.role} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Szybkie akcje" />
        <View style={styles.actionsRow}>
          <ActionCard
            title="Przejdz do planow"
            subtitle="Dodaj nowy plan treningowy"
            onPress={() => onNavigate('plans')}
          />
          <ActionCard
            title="Sprawdz postepy"
            subtitle="Zobacz wpisy i historie obciazen"
            onPress={() => onNavigate('progress')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Ostatnia aktywnosc" />
        <View style={styles.activityCard}>
          {latestSession ? (
            <>
              <Text style={styles.activityTitle}>Ostatnia sesja</Text>
              <Text style={styles.activityMeta}>
                {formatDate(latestSession.sessionDate)}
              </Text>
              <View style={styles.activityFooter}>
                <Badge label={`${latestSession.durationMinutes} min`} />
                <Badge label={`Plan #${latestSession.workoutPlanId}`} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.activityTitle}>Brak zapisanych sesji</Text>
              <Text style={styles.activityMeta}>
                Dodaj pierwsza sesje z zakladki Sesje.
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#1F241F',
    borderRadius: 28,
    padding: 22,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#CFE8DD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: '#1F241F',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFF7E8',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#D9D3C7',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionsRow: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#FFF7E8',
    borderRadius: 24,
    padding: 18,
  },
  activityTitle: {
    color: '#1F241F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  activityMeta: {
    color: '#6D6A63',
    fontSize: 14,
    marginBottom: 14,
  },
  activityFooter: {
    flexDirection: 'row',
    gap: 8,
  },
});
