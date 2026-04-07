import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {gymApi} from '../api/gym';
import {EmptyState} from '../components/EmptyState';
import {MessageBanner} from '../components/MessageBanner';
import {PrimaryButton} from '../components/PrimaryButton';
import {ResourceCard} from '../components/ResourceCard';
import {SectionTitle} from '../components/SectionTitle';
import {
  AuthSession,
  MembershipTypeDto,
  UserDto,
  UserMembershipDto,
} from '../types/api';
import {formatDate} from '../utils/format';

type ProfileScreenProps = {
  session: AuthSession;
  onLogout: () => void;
};

export function ProfileScreen({session, onLogout}: ProfileScreenProps) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [memberships, setMemberships] = useState<UserMembershipDto[]>([]);
  const [membershipTypes, setMembershipTypes] = useState<MembershipTypeDto[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [userItem, userMembershipItems, membershipTypeItems] =
        await Promise.all([
          gymApi.getUserById(session.token, session.userId),
          gymApi.getUserMemberships(session.token),
          gymApi.getMembershipTypes(session.token),
        ]);
      setUser(userItem);
      setMemberships(userMembershipItems);
      setMembershipTypes(membershipTypeItems);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nie udalo sie pobrac profilu.',
      );
    } finally {
      setLoading(false);
    }
  }, [session.token, session.userId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const ownMemberships = useMemo(() => {
    return memberships.filter(item => item.userId === session.userId);
  }, [memberships, session.userId]);

  const membershipTypeName = (id: number) =>
    membershipTypes.find(item => item.id === id)?.name ?? `Typ #${id}`;

  if (loading) {
    return <ActivityIndicator size="large" color="#1F8A70" />;
  }

  return (
    <View>
      {error ? <MessageBanner tone="error" text={error} /> : null}

      <View style={styles.summaryCard}>
        <Text style={styles.name}>{user?.name ?? session.email}</Text>
        <Text style={styles.meta}>{user?.email ?? session.email}</Text>
        <Text style={styles.meta}>Rola: {user?.roleName ?? session.role}</Text>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Czlonkostwo" />
        {ownMemberships.length === 0 ? (
          <EmptyState
            title="Brak czlonkostwa"
            description="Dla tego uzytkownika nie ma jeszcze przypisanego karnetu."
          />
        ) : (
          ownMemberships.map(item => (
            <ResourceCard
              key={item.id}
              title={membershipTypeName(item.membershipTypeId)}
              description={`Status: ${item.status}`}
              meta={`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}
            />
          ))
        )}
      </View>

      <View style={styles.section}>
        <PrimaryButton title="Wyloguj" onPress={onLogout} tone="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#FFF7E8',
    borderRadius: 24,
    padding: 18,
  },
  name: {
    color: '#1F241F',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  meta: {
    color: '#6D6A63',
    fontSize: 14,
    marginBottom: 4,
  },
  section: {
    marginTop: 24,
  },
});
