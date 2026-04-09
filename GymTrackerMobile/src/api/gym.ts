//plik zawiera wszystkie funkcje do komunikacji z backendem w zakresie zarzadzania cwiczeniami, planami treningowymi, sesjami treningowymi, postepami i czlonkostwami uzytkownikow
import {apiRequest} from './http';
import {
  CreateExercisePayload,
  CreateProgressEntryPayload,
  CreateWorkoutPlanPayload,
  CreateWorkoutSessionPayload,
  ExerciseCategoryDto,
  ExerciseDto,
  MembershipTypeDto,
  ProgressEntryDto,
  UserDto,
  UserMembershipDto,
  WorkoutPlanDto,
  WorkoutSessionDto,
} from '../types/api';

export const gymApi = {
  getUsers: (token: string) => apiRequest<UserDto[]>('/api/Users', {token}),
  getUserById: (token: string, id: number) =>
    apiRequest<UserDto>(`/api/Users/${id}`, {token}),
  getExercises: (token: string) =>
    apiRequest<ExerciseDto[]>('/api/Exercises', {token}),
  getExerciseCategories: (token: string) =>
    apiRequest<ExerciseCategoryDto[]>('/api/ExerciseCategories', {token}),
  createExercise: (token: string, payload: CreateExercisePayload) =>
    apiRequest<ExerciseDto>('/api/Exercises', {
      method: 'POST',
      token,
      body: payload,
    }),
  deleteExercise: (token: string, id: number) =>
    apiRequest<void>(`/api/Exercises/${id}`, {method: 'DELETE', token}),
  getWorkoutPlans: (token: string) =>
    apiRequest<WorkoutPlanDto[]>('/api/WorkoutPlans', {token}),
  createWorkoutPlan: (token: string, payload: CreateWorkoutPlanPayload) =>
    apiRequest<WorkoutPlanDto>('/api/WorkoutPlans', {
      method: 'POST',
      token,
      body: payload,
    }),
  deleteWorkoutPlan: (token: string, id: number) =>
    apiRequest<void>(`/api/WorkoutPlans/${id}`, {method: 'DELETE', token}),
  getWorkoutSessions: (token: string) =>
    apiRequest<WorkoutSessionDto[]>('/api/WorkoutSessions', {token}),
  createWorkoutSession: (token: string, payload: CreateWorkoutSessionPayload) =>
    apiRequest<WorkoutSessionDto>('/api/WorkoutSessions', {
      method: 'POST',
      token,
      body: payload,
    }),
  deleteWorkoutSession: (token: string, id: number) =>
    apiRequest<void>(`/api/WorkoutSessions/${id}`, {method: 'DELETE', token}),
  getProgressEntries: (token: string) =>
    apiRequest<ProgressEntryDto[]>('/api/ProgressEntries', {token}),
  createProgressEntry: (token: string, payload: CreateProgressEntryPayload) =>
    apiRequest<ProgressEntryDto>('/api/ProgressEntries', {
      method: 'POST',
      token,
      body: payload,
    }),
  deleteProgressEntry: (token: string, id: number) =>
    apiRequest<void>(`/api/ProgressEntries/${id}`, {method: 'DELETE', token}),
  getMembershipTypes: (token: string) =>
    apiRequest<MembershipTypeDto[]>('/api/MembershipTypes', {token}),
  getUserMemberships: (token: string) =>
    apiRequest<UserMembershipDto[]>('/api/UserMemberships', {token}),
};
