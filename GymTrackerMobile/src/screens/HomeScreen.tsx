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

    //Promisa.all pozwala nam pobrac wszystkie dane jednoczesnie, zamiast czekac na kazde z nich osobno
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
        ); // sortujemy sesje od najnowszej do najstarszej, zeby latwo bylo pobrac ostatnia sesje

      setPlansCount(ownPlans.length);
      setExercisesCount(exercises.length); // exercises sa wspolne dla wszystkich uzytkownikow, dlatego nie filtrujemy ich po userId
      setLatestSession(ownSessions[0] ?? null); // pobieramy pierwsza sesje z posortowanej listy, czyli najnowsza sesje. Jesli nie ma zadnej sesji, ustawiamy null
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac danych dashboardu.', 
      );// jesli loadError jest instancja Error, to pobieramy message, w przeciwnym razie ustawiamy ogolny komunikat bledu
    } finally {
      setLoading(false); // niezaleznie od tego, czy pobieranie danych sie powiodlo, czy nie, ustawiamy loading na false, zeby ukryc spinnera
    }
  }, [session.token, session.userId]); // useCallback pozwala nam zapamietac funkcje loadData, zeby nie byla tworzona od nowa przy kazdym renderze. Funkcja bedzie tworzona ponownie tylko wtedy, gdy zmieni sie session.token lub session.userId, co jest logiczne, bo te dane sa potrzebne do pobrania danych dashboardu

  useEffect(() => {
    void loadData(); //loadData jest funkcja asynchroniczna, wiec wywolujemy ja z void, zeby uniknac ostrzezenia o nieobsluzonej promisie, bo zwraca ona promise
  }, [loadData]); // useEffect pozwala nam wywolac funkcje loadData zaraz po zamontowaniu komponentu HomeScreen. Poniewaz loadData jest zapamietana przez useCallback, to nie bedzie powodowac nieskonczonej petli renderowania, a jedynie wywolanie loadData raz, gdy komponent zostanie zamontowany

  if (loading) {
    return <ActivityIndicator size="large" color="#1F8A70" />;
  } // jesli loading jest true, to wyswietlamy spinnera, zeby pokazac uzytkownikowi, ze dane sa w trakcie ladowania. Gdy loading stanie sie false, to spinner zniknie i pojawi sie reszta zawartosci ekranu

  return (
    <View>
      {error ? <MessageBanner tone="error" text={error} /> : null} // jesli error jest pusty to renderuje null, czyli nic, a jesli error zawiera jakis komunikat bledu, to renderuje MessageBanner z tym komunikatem

      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Witaj, {session.email}</Text>
        </View>
        <Text style={styles.heroTitle}>Twoje statystyki treningowe</Text>
        <Text style={styles.heroSubtitle}>
          Sprawdz swoje postepy i zarzadzaj swoimi planami treningowymi
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
          // jesli latestSession jest null, to znaczy, ze uzytkownik nie ma zadnej zapisanej sesji treningowej, wiec wyswietlamy komunikat o braku sesji. Jesli latestSession zawiera dane, to wyswietlamy informacje o tej sesji, takie jak data, czas trwania i id planu treningowego
          {latestSession ? (
            <>
              <Text style={styles.activityTitle}>Ostatnia sesja</Text>
              <Text style={styles.activityMeta}>
                {formatDate(latestSession.sessionDate)} // pokazuje sformatowana date ostatniej sesji, formatDate to funkcja pomocnicza, ktora formatuje date w ladny sposob, np. "12 lipca 2024, 18:30"
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
    alignSelf: 'flex-start', // sprawia, ze badge bedzie dopasowywac sie do szerokosci swojego tekstu, zamiast rozciagac sie na caly dostepny obszar. Dzieki temu badge bedzie wygladal bardziej estetycznie i bedzie lepiej pasowal do designu ekranu  
    borderRadius: 999, // duza wartosc borderRadius sprawia, ze badge bedzie mial bardzo zaokraglone rogi, praktycznie bedzie wygladal jak owal lub pilka, co jest popularnym stylem dla badge'ow i dobrze kontrastuje z prostokatnym ksztaltem heroCard
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
    flexDirection: 'row', // ustawiamy kierunek ukladania elementow na wiersz, zeby StatCard byly ulozone obok siebie poziomo
    flexWrap: 'wrap', // jesli nie mieszcza sie wszystkie StatCard w jednym wierszu, to pozwalamy im zawijac sie do nastepnego wiersza, zeby zachowac ladny uklad i uniknac przewijania poziomego
    justifyContent: 'space-between', // rozkladamy StatCard rownomiernie w dostepnej przestrzeni, zeby miedzy nimi byly rowne odstepy, co poprawia estetyke i czytelnosc ekranu
    gap: 12, // odstep pomiedzy elementami
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
