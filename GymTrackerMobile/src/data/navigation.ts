import type {TabKey} from '../types/api';

export const tabs: Array<{key: TabKey; label: string; icon: string}> = [
  {key: 'home', label: 'Home', icon: 'H'},
  {key: 'plans', label: 'Plany', icon: 'P'},
  {key: 'exercises', label: 'Cwiczenia', icon: 'C'},
  {key: 'sessions', label: 'Sesje', icon: 'T'},
  {key: 'progress', label: 'Postepy', icon: 'S'},
  {key: 'profile', label: 'Profil', icon: 'U'},
];

export type {TabKey};
