// nawigacja i zarzadzanie ekranami w aplikacji. ShellScreen jest glownym ekranem, ktory zawiera nawigacje i wszystkie inne ekrany, dlatego jest to centralny punkt naszej aplikacji, do ktorego przechodzimy po udanym logowaniu/rejestracji. W zaleznosci od tego, jaki tab jest aktywny, wyswietlamy odpowiedni ekran (HomeScreen, PlansScreen, ExercisesScreen, SessionsScreen, ProgressScreen lub ProfileScreen). ShellScreen przyjmuje session i onLogout jako propsy, zeby moc przekazywac je do poszczegolnych ekranow i zarzadzac stanem zalogowania w aplikacji.
import React, {useMemo, useState} from 'react';

import {MainLayout} from '../layouts/MainLayout';
import {tabTitles} from '../data/mockData';
import type {AuthSession, TabKey} from '../types/api';
import {ExercisesScreen} from './ExercisesScreen';
import {HomeScreen} from './HomeScreen';
import {PlansScreen} from './PlansScreen';
import {ProfileScreen} from './ProfileScreen';
import {ProgressScreen} from './ProgressScreen';
import {SessionsScreen} from './SessionsScreen';

type ShellScreenProps = {
  session: AuthSession;
  onLogout: () => void;
};

export function ShellScreen({session, onLogout}: ShellScreenProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const screen = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen session={session} onNavigate={setActiveTab} />;
      case 'plans':
        return <PlansScreen session={session} />;
      case 'exercises':
        return <ExercisesScreen session={session} />;
      case 'sessions':
        return <SessionsScreen session={session} />;
      case 'progress':
        return <ProgressScreen session={session} />;
      case 'profile':
        return <ProfileScreen session={session} onLogout={onLogout} />;
      default:
        return null;
    }
  }, [activeTab, onLogout, session]);

  return (
    <MainLayout title={tabTitles[activeTab]} activeTab={activeTab} onTabPress={setActiveTab}>
      {screen}
    </MainLayout>
  );
}
