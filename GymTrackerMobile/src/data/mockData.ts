//Plik z przykładowymi danymi do testowania i rozwoju aplikacji
export type TabKey = 'home' | 'plans' | 'exercises' | 'progress' | 'profile';
export type ExerciseFilter =
  | 'Wszystkie'
  | 'Klatka'
  | 'Plecy'
  | 'Nogi'
  | 'Cardio';

export type ExerciseItem = {
  id: string;
  name: string;
  category: Exclude<ExerciseFilter, 'Wszystkie'>;
  difficulty: 'Latwy' | 'Sredni' | 'Trudny';
};

export const filters: ExerciseFilter[] = [
  'Wszystkie',
  'Klatka',
  'Plecy',
  'Nogi',
  'Cardio',
];

export const exercises: ExerciseItem[] = [
  {
    id: '1',
    name: 'Wyciskanie sztangi',
    category: 'Klatka',
    difficulty: 'Sredni',
  },
  {
    id: '2',
    name: 'Martwy ciag',
    category: 'Plecy',
    difficulty: 'Trudny',
  },
  {
    id: '3',
    name: 'Przysiady',
    category: 'Nogi',
    difficulty: 'Sredni',
  },
  {
    id: '4',
    name: 'Burpees',
    category: 'Cardio',
    difficulty: 'Trudny',
  },
  {
    id: '5',
    name: 'Rozpietki hantlami',
    category: 'Klatka',
    difficulty: 'Latwy',
  },
];
