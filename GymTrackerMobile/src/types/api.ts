export type TabKey =
  | 'home'
  | 'plans'
  | 'exercises'
  | 'sessions'
  | 'progress'
  | 'profile';

export type AuthMode = 'login' | 'register';

export type AuthResponseDto = {
  token: string;
  email: string;
  role: string;
  expiresAtUtc: string;
};

export type AuthSession = {
  token: string;
  email: string;
  role: string;
  expiresAtUtc: string;
  userId: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  roleId: number;
};

export type UserDto = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
};

export type ExerciseCategoryDto = {
  id: number;
  name: string;
  description?: string | null;
};

export type ExerciseDto = {
  id: number;
  name: string;
  description?: string | null;
  difficultyLevel: string;
  categoryId: number;
  categoryName: string;
};

export type WorkoutPlanDto = {
  id: number;
  userId: number;
  name: string;
  goal?: string | null;
  createdAt: string;
};

export type WorkoutSessionDto = {
  id: number;
  userId: number;
  workoutPlanId: number;
  sessionDate: string;
  durationMinutes: number;
  notes?: string | null;
};

export type ProgressEntryDto = {
  id: number;
  userId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  createdAt: string;
  comment?: string | null;
};

export type MembershipTypeDto = {
  id: number;
  name: string;
  description?: string | null;
};

export type UserMembershipDto = {
  id: number;
  userId: number;
  membershipTypeId: number;
  startDate: string;
  endDate: string;
  status: string;
};

export type CreateExercisePayload = {
  name: string;
  description?: string | null;
  difficultyLevel: string;
  categoryId: number;
};

export type CreateWorkoutPlanPayload = {
  userId: number;
  name: string;
  goal?: string | null;
  createdAt: string;
};

export type CreateWorkoutSessionPayload = {
  userId: number;
  workoutPlanId: number;
  sessionDate: string;
  durationMinutes: number;
  notes?: string | null;
};

export type CreateProgressEntryPayload = {
  userId: number;
  exerciseId: number;
  weight: number;
  reps: number;
  createdAt: string;
  comment?: string | null;
};
