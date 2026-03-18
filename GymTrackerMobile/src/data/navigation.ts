//konfiguracja dolnych zakladek, ich klucze, etykiety i ikony
import {TabKey} from './mockData';

export const tabs: Array<{key: TabKey; label: string; icon: string}> = [
  {key: 'home', label: 'Home', icon: 'H'},
  {key: 'plans', label: 'Plany', icon: 'P'},
  {key: 'exercises', label: 'Cwiczenia', icon: 'C'},
  {key: 'progress', label: 'Postepy', icon: 'S'},
  {key: 'profile', label: 'Profil', icon: 'U'},
];

export type {TabKey};
