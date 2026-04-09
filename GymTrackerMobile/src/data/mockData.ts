// plik zawiera dane testowe, które są używane podczas tworzenia i testowania komponentów UI, zanim zostanie podłączona prawdziwa logika do backendu. Dzięki temu możemy pracować nad interfejsem użytkownika niezależnie od stanu implementacji API.
import type {TabKey} from '../types/api';

export const tabTitles: Record<TabKey, string> = {
  home: 'Dashboard',
  plans: 'Plany',
  exercises: 'Cwiczenia',
  sessions: 'Sesje',
  progress: 'Postepy',
  profile: 'Profil',
};
