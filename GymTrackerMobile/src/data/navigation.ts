//nawigacja w aplikacji, zawiera definicję dostępnych zakładek i ich kluczy, które są używane w całej aplikacji do określania, która zakładka jest aktywna i jakie dane powinny być wyświetlane. Dzięki temu mamy centralne miejsce, gdzie możemy zarządzać strukturą nawigacji naszej aplikacji.
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
