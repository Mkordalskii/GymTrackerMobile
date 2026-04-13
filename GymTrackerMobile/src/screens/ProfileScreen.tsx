import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';

import {gymApi} from '../api/gym';
import {EmptyState} from '../components/EmptyState';
import {FormField} from '../components/FormField';
import {MessageBanner} from '../components/MessageBanner';
import {ModalCard} from '../components/ModalCard';
import {PrimaryButton} from '../components/PrimaryButton';
import {ResourceCard} from '../components/ResourceCard';
import {SelectField} from '../components/SelectField';
import {SectionTitle} from '../components/SectionTitle';
import {
  AuthSession,
  ExerciseCategoryDto,
  MembershipTypeDto,
  RoleDto,
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
  const [categories, setCategories] = useState<ExerciseCategoryDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRoleId, setUserRoleId] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExerciseCategoryDto | null>(
    null,
  );
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [isMembershipTypeModalVisible, setIsMembershipTypeModalVisible] =
    useState(false);
  const [editingMembershipType, setEditingMembershipType] =
    useState<MembershipTypeDto | null>(null);
  const [membershipTypeName, setMembershipTypeName] = useState('');
  const [membershipTypeDescription, setMembershipTypeDescription] = useState('');
  const [isUserMembershipModalVisible, setIsUserMembershipModalVisible] =
    useState(false);
  const [editingUserMembership, setEditingUserMembership] =
    useState<UserMembershipDto | null>(null);
  const [membershipUserId, setMembershipUserId] = useState('');
  const [membershipTypeId, setMembershipTypeId] = useState('');
  const [membershipStartDate, setMembershipStartDate] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = useMemo(
    () => (user?.roleName ?? session.role).toLowerCase() === 'admin',
    [session.role, user?.roleName],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const userItem = await gymApi.getUserById(session.token, session.userId);
      const admin = userItem.roleName.toLowerCase() === 'admin';
      const requests: Promise<unknown>[] = [gymApi.getUserMemberships(session.token)];
      if (admin) {
        requests.push(
          gymApi.getMembershipTypes(session.token),
          gymApi.getUsers(session.token),
          gymApi.getExerciseCategories(session.token),
          gymApi.getRoles(session.token),
        );
      }
      const results = await Promise.all(requests);
      const userMembershipItems = results[0] as UserMembershipDto[];
      setUser(userItem);
      setMemberships(userMembershipItems);
      if (admin) {
        setMembershipTypes(results[1] as MembershipTypeDto[]);
        setUsers(results[2] as UserDto[]);
        setCategories(results[3] as ExerciseCategoryDto[]);
        setRoles(results[4] as RoleDto[]);
      } else {
        setMembershipTypes([]);
        setUsers([]);
        setCategories([]);
        setRoles([]);
      }
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
    loadData().catch(() => undefined);
  }, [loadData]);

  const ownMemberships = useMemo(() => {
    return memberships.filter(item => item.userId === session.userId);
  }, [memberships, session.userId]);

  const getMembershipTypeName = (id: number) =>
    membershipTypes.find(item => item.id === id)?.name ?? `Typ #${id}`;
  const userNameById = (id: number) =>
    users.find(item => item.id === id)?.name ?? `Uzytkownik #${id}`;
  const roleNameById = (id: number) =>
    roles.find(item => item.id === id)?.name ?? `Rola #${id}`;

  const roleOptions = useMemo(
    () => roles.map(item => ({value: String(item.id), label: item.name})),
    [roles],
  );
  const userOptions = useMemo(
    () => users.map(item => ({value: String(item.id), label: item.name})),
    [users],
  );
  const membershipTypeOptions = useMemo(
    () => membershipTypes.map(item => ({value: String(item.id), label: item.name})),
    [membershipTypes],
  );

  const resetUserForm = () => {
    setEditingUser(null);
    setUserName('');
    setUserEmail('');
    setUserRoleId(roleOptions[0] ? roleOptions[0].value : '');
  };
  const resetCategoryForm = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryDescription('');
  };
  const resetMembershipTypeForm = () => {
    setEditingMembershipType(null);
    setMembershipTypeName('');
    setMembershipTypeDescription('');
  };
  const resetUserMembershipForm = () => {
    setEditingUserMembership(null);
    setMembershipUserId(userOptions[0] ? userOptions[0].value : '');
    setMembershipTypeId(
      membershipTypeOptions[0] ? membershipTypeOptions[0].value : '',
    );
    setMembershipStartDate(new Date().toISOString().slice(0, 10));
    setMembershipEndDate(new Date().toISOString().slice(0, 10));
    setMembershipStatus('Active');
  };

  const handleSubmitUser = async () => {
    if (!editingUser || !userRoleId) {
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await gymApi.updateUser(session.token, editingUser.id, {
        id: editingUser.id,
        name: userName,
        email: userEmail,
        roleId: Number(userRoleId),
      });
      setIsUserModalVisible(false);
      resetUserForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Nie udalo sie zapisac uzytkownika.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await gymApi.deleteUser(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : 'Nie udalo sie usunac uzytkownika.',
      );
    }
  };

  const handleSubmitCategory = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      if (editingCategory) {
        await gymApi.updateExerciseCategory(session.token, editingCategory.id, {
          id: editingCategory.id,
          name: categoryName,
          description: categoryDescription || null,
        });
      } else {
        await gymApi.createExerciseCategory(session.token, {
          name: categoryName,
          description: categoryDescription || null,
        });
      }
      setIsCategoryModalVisible(false);
      resetCategoryForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Nie udalo sie zapisac kategorii.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await gymApi.deleteExerciseCategory(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : 'Nie udalo sie usunac kategorii.',
      );
    }
  };

  const handleSubmitMembershipType = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      if (editingMembershipType) {
        await gymApi.updateMembershipType(session.token, editingMembershipType.id, {
          id: editingMembershipType.id,
          name: membershipTypeName,
          description: membershipTypeDescription || null,
        });
      } else {
        await gymApi.createMembershipType(session.token, {
          name: membershipTypeName,
          description: membershipTypeDescription || null,
        });
      }
      setIsMembershipTypeModalVisible(false);
      resetMembershipTypeForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie zapisac typu czlonkostwa.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMembershipType = async (id: number) => {
    try {
      await gymApi.deleteMembershipType(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac typu czlonkostwa.',
      );
    }
  };

  const handleSubmitUserMembership = async () => {
    if (!membershipUserId || !membershipTypeId) {
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      if (editingUserMembership) {
        await gymApi.updateUserMembership(session.token, editingUserMembership.id, {
          id: editingUserMembership.id,
          userId: Number(membershipUserId),
          membershipTypeId: Number(membershipTypeId),
          startDate: membershipStartDate,
          endDate: membershipEndDate,
          status: membershipStatus,
        });
      } else {
        await gymApi.createUserMembership(session.token, {
          userId: Number(membershipUserId),
          membershipTypeId: Number(membershipTypeId),
          startDate: membershipStartDate,
          endDate: membershipEndDate,
          status: membershipStatus,
        });
      }
      setIsUserMembershipModalVisible(false);
      resetUserMembershipForm();
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie zapisac czlonkostwa uzytkownika.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUserMembership = async (id: number) => {
    try {
      await gymApi.deleteUserMembership(session.token, id);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Nie udalo sie usunac czlonkostwa uzytkownika.',
      );
    }
  };

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
              title={getMembershipTypeName(item.membershipTypeId)}
              description={`Status: ${item.status}`}
              meta={`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}
            />
          ))
        )}
      </View>

      <View style={styles.section}>
        <PrimaryButton title="Wyloguj" onPress={onLogout} tone="secondary" />
      </View>

      {isAdmin ? (
        <>
          <View style={styles.section}>
            <SectionTitle title="Zarzadzanie uzytkownikami" />
            {users.length === 0 ? (
              <EmptyState
                title="Brak uzytkownikow"
                description="Brak rekordow do wyswietlenia."
              />
            ) : (
              users.map(item => (
                <ResourceCard
                  key={item.id}
                  title={item.name}
                  description={item.email}
                  meta={`Rola: ${item.roleName}`}
                  onEdit={() => {
                    setEditingUser(item);
                    setUserName(item.name);
                    setUserEmail(item.email);
                    setUserRoleId(String(item.roleId));
                    setIsUserModalVisible(true);
                  }}
                  onDelete={() => handleDeleteUser(item.id)}
                />
              ))
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.headerRow}>
              <SectionTitle title="Kategorie cwiczen" />
              <PrimaryButton
                title="+ Dodaj"
                onPress={() => {
                  resetCategoryForm();
                  setIsCategoryModalVisible(true);
                }}
              />
            </View>
            {categories.length === 0 ? (
              <EmptyState
                title="Brak kategorii"
                description="Dodaj pierwsza kategorie cwiczen."
              />
            ) : (
              categories.map(item => (
                <ResourceCard
                  key={item.id}
                  title={item.name}
                  description={item.description || 'Brak opisu'}
                  onEdit={() => {
                    setEditingCategory(item);
                    setCategoryName(item.name);
                    setCategoryDescription(item.description || '');
                    setIsCategoryModalVisible(true);
                  }}
                  onDelete={() => handleDeleteCategory(item.id)}
                />
              ))
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.headerRow}>
              <SectionTitle title="Typy czlonkostwa" />
              <PrimaryButton
                title="+ Dodaj"
                onPress={() => {
                  resetMembershipTypeForm();
                  setIsMembershipTypeModalVisible(true);
                }}
              />
            </View>
            {membershipTypes.length === 0 ? (
              <EmptyState
                title="Brak typow czlonkostwa"
                description="Dodaj pierwszy typ czlonkostwa."
              />
            ) : (
              membershipTypes.map(item => (
                <ResourceCard
                  key={item.id}
                  title={item.name}
                  description={item.description || 'Brak opisu'}
                  onEdit={() => {
                    setEditingMembershipType(item);
                    setMembershipTypeName(item.name);
                    setMembershipTypeDescription(item.description || '');
                    setIsMembershipTypeModalVisible(true);
                  }}
                  onDelete={() => handleDeleteMembershipType(item.id)}
                />
              ))
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.headerRow}>
              <SectionTitle title="Czlonkostwa uzytkownikow" />
              <PrimaryButton
                title="+ Dodaj"
                onPress={() => {
                  resetUserMembershipForm();
                  setIsUserMembershipModalVisible(true);
                }}
              />
            </View>
            {memberships.length === 0 ? (
              <EmptyState
                title="Brak czlonkostw"
                description="Dodaj pierwsze czlonkostwo."
              />
            ) : (
              memberships.map(item => (
                <ResourceCard
                  key={item.id}
                  title={`${userNameById(item.userId)} -> ${getMembershipTypeName(
                    item.membershipTypeId,
                  )}`}
                  description={`Status: ${item.status}`}
                  meta={`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}
                  onEdit={() => {
                    setEditingUserMembership(item);
                    setMembershipUserId(String(item.userId));
                    setMembershipTypeId(String(item.membershipTypeId));
                    setMembershipStartDate(item.startDate.slice(0, 10));
                    setMembershipEndDate(item.endDate.slice(0, 10));
                    setMembershipStatus(item.status);
                    setIsUserMembershipModalVisible(true);
                  }}
                  onDelete={() => handleDeleteUserMembership(item.id)}
                />
              ))
            )}
          </View>
        </>
      ) : null}

      <ModalCard
        visible={isUserModalVisible}
        title="Edytuj uzytkownika"
        onClose={() => {
          setIsUserModalVisible(false);
          resetUserForm();
        }}>
        <ScrollView>
          <FormField
            label="Imie i nazwisko"
            value={userName}
            onChangeText={setUserName}
            placeholder="Jan Kowalski"
          />
          <FormField
            label="Email"
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="user@gym.com"
            keyboardType="email-address"
          />
          <SelectField
            label="Rola"
            value={userRoleId}
            options={roleOptions}
            onChange={setUserRoleId}
            emptyMessage="Brak rol do wyboru."
          />
          <Text style={styles.inlineHint}>
            Aktualna rola: {userRoleId ? roleNameById(Number(userRoleId)) : '-'}
          </Text>
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}
            onPress={handleSubmitUser}
            disabled={isSubmitting || !editingUser || !userRoleId}
          />
        </ScrollView>
      </ModalCard>

      <ModalCard
        visible={isCategoryModalVisible}
        title={editingCategory ? 'Edytuj kategorie' : 'Nowa kategoria'}
        onClose={() => {
          setIsCategoryModalVisible(false);
          resetCategoryForm();
        }}>
        <ScrollView>
          <FormField
            label="Nazwa"
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="Plecy"
          />
          <FormField
            label="Opis"
            value={categoryDescription}
            onChangeText={setCategoryDescription}
            placeholder="Opis kategorii"
            multiline
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
            onPress={handleSubmitCategory}
            disabled={isSubmitting}
          />
        </ScrollView>
      </ModalCard>

      <ModalCard
        visible={isMembershipTypeModalVisible}
        title={editingMembershipType ? 'Edytuj typ czlonkostwa' : 'Nowy typ czlonkostwa'}
        onClose={() => {
          setIsMembershipTypeModalVisible(false);
          resetMembershipTypeForm();
        }}>
        <ScrollView>
          <FormField
            label="Nazwa"
            value={membershipTypeName}
            onChangeText={setMembershipTypeName}
            placeholder="Premium"
          />
          <FormField
            label="Opis"
            value={membershipTypeDescription}
            onChangeText={setMembershipTypeDescription}
            placeholder="Opis typu"
            multiline
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
            onPress={handleSubmitMembershipType}
            disabled={isSubmitting}
          />
        </ScrollView>
      </ModalCard>

      <ModalCard
        visible={isUserMembershipModalVisible}
        title={
          editingUserMembership
            ? 'Edytuj czlonkostwo uzytkownika'
            : 'Nowe czlonkostwo uzytkownika'
        }
        onClose={() => {
          setIsUserMembershipModalVisible(false);
          resetUserMembershipForm();
        }}>
        <ScrollView>
          <SelectField
            label="Uzytkownik"
            value={membershipUserId}
            options={userOptions}
            onChange={setMembershipUserId}
            emptyMessage="Brak uzytkownikow."
          />
          <SelectField
            label="Typ czlonkostwa"
            value={membershipTypeId}
            options={membershipTypeOptions}
            onChange={setMembershipTypeId}
            emptyMessage="Brak typow czlonkostwa."
          />
          <FormField
            label="Data startu (YYYY-MM-DD)"
            value={membershipStartDate}
            onChangeText={setMembershipStartDate}
            placeholder="2026-01-01"
          />
          <FormField
            label="Data konca (YYYY-MM-DD)"
            value={membershipEndDate}
            onChangeText={setMembershipEndDate}
            placeholder="2026-12-31"
          />
          <FormField
            label="Status"
            value={membershipStatus}
            onChangeText={setMembershipStatus}
            placeholder="Active"
          />
          <PrimaryButton
            title={isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
            onPress={handleSubmitUserMembership}
            disabled={isSubmitting || !membershipUserId || !membershipTypeId}
          />
        </ScrollView>
      </ModalCard>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  inlineHint: {
    color: '#6D6A63',
    fontSize: 12,
    marginBottom: 12,
  },
});
