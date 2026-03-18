import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ActionCard} from '../components/ActionCard';
import {Badge} from '../components/Badge';
import {SectionTitle} from '../components/SectionTitle';
import {StatCard} from '../components/StatCard';

export function HomeScreen() {
  return (
    <View>
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Witaj, Adam</Text>
        </View>
        <Text style={styles.heroTitle}>Twoj plan na dzisiaj jest gotowy</Text>
        <Text style={styles.heroSubtitle}>
          Szybko sprawdz postepy i wroc do najwazniejszych akcji.
        </Text>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Twoje podsumowanie" />
        <View style={styles.statsGrid}>
          <StatCard label="Aktywny plan" value="FBW 3 dni" />
          <StatCard label="Ostatni trening" value="55 min" />
          <StatCard label="Cwiczenia" value="24" />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Szybkie akcje" />
        <View style={styles.actionsRow}>
          <ActionCard
            title="Dodaj sesje"
            subtitle="Zapisz trening w kilku krokach"
          />
          <ActionCard
            title="Zobacz plan"
            subtitle="Sprawdz cwiczenia na dzisiaj"
          />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Ostatnia aktywnosc" />
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Trening FBW</Text>
            <Text style={styles.activityDate}>17.03.2026</Text>
          </View>
          <Text style={styles.activityMeta}>Klatka, plecy, nogi</Text>
          <View style={styles.activityFooter}>
            <Badge label="55 min" />
            <Badge label="7 cwiczen" />
          </View>
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  activityTitle: {
    color: '#1F241F',
    fontSize: 18,
    fontWeight: '700',
  },
  activityDate: {
    color: '#6D6A63',
    fontSize: 13,
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
