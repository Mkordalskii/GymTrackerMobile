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
  RoleDto,
  WorkoutPlanExerciseDto,
  CreateRolePayload,
  CreateMembershipTypePayload,
  CreateUserMembershipPayload,
  CreateExerciseCategoryPayload,
  CreateWorkoutPlanExercisePayload,
  UpdateUserPayload,
  UpdateExercisePayload,
  UpdateWorkoutPlanPayload,
  UpdateWorkoutSessionPayload,
  UpdateProgressEntryPayload,
} from '../types/api';

export const gymApi = {
  // User
  getUsers: (token: string) => apiRequest<UserDto[]>('/api/Users', {token}),
  getUserById: (token: string, id: number) =>
    apiRequest<UserDto>(`/api/Users/${id}`, {token}),
  updateUser: (token: string, id: number, payload: UpdateUserPayload) =>
    apiRequest<UserDto>(`/api/Users/${id}`, { method: 'PUT', token, body: payload }),
  deleteUser: (token: string, id: number) =>
    apiRequest<void>(`/api/Users/${id}`, { method: 'DELETE', token }),

  // Exercise
  getExercises: (token: string) =>
    apiRequest<ExerciseDto[]>('/api/Exercises', {token}),
  getExerciseById: (token: string, id: number) =>
    apiRequest<ExerciseDto>(`/api/Exercises/${id}`, {token}),
  createExercise: (token: string, payload: CreateExercisePayload) =>
    apiRequest<ExerciseDto>('/api/Exercises', {
      method: 'POST',
      token,
      body: payload,
    }),
  updateExercise: (token: string, id: number, payload: UpdateExercisePayload) =>
    apiRequest<void>(`/api/Exercises/${id}`, { method: 'PUT', token, body: payload }),
  deleteExercise: (token: string, id: number) =>
    apiRequest<void>(`/api/Exercises/${id}`, {method: 'DELETE', token}),

  // ExerciseCategory
  getExerciseCategories: (token: string) =>
    apiRequest<ExerciseCategoryDto[]>('/api/ExerciseCategories', {token}),
  getExerciseCategoryById: (token: string, id: number) =>
    apiRequest<ExerciseCategoryDto>(`/api/ExerciseCategories/${id}`, {token}),
  createExerciseCategory: (token: string, payload: CreateExerciseCategoryPayload) =>
    apiRequest<ExerciseCategoryDto>('/api/ExerciseCategories', { method: 'POST', token, body: payload }),
  updateExerciseCategory: (token: string, id: number, payload: CreateExerciseCategoryPayload) =>
    apiRequest<ExerciseCategoryDto>(`/api/ExerciseCategories/${id}`, { method: 'PUT', token, body: payload }),
  deleteExerciseCategory: (token: string, id: number) =>
    apiRequest<void>(`/api/ExerciseCategories/${id}`, { method: 'DELETE', token }),

  // MembershipType
  getMembershipTypes: (token: string) =>
    apiRequest<MembershipTypeDto[]>('/api/MembershipTypes', {token}),
  getMembershipTypeById: (token: string, id: number) =>
    apiRequest<MembershipTypeDto>(`/api/MembershipTypes/${id}`, {token}),
  createMembershipType: (token: string, payload: CreateMembershipTypePayload) =>
    apiRequest<MembershipTypeDto>('/api/MembershipTypes', { method: 'POST', token, body: payload }),
  updateMembershipType: (token: string, id: number, payload: CreateMembershipTypePayload) =>
    apiRequest<MembershipTypeDto>(`/api/MembershipTypes/${id}`, { method: 'PUT', token, body: payload }),
  deleteMembershipType: (token: string, id: number) =>
    apiRequest<void>(`/api/MembershipTypes/${id}`, { method: 'DELETE', token }),

  // ProgressEntry
  getProgressEntries: (token: string) =>
    apiRequest<ProgressEntryDto[]>('/api/ProgressEntries', {token}),
  getProgressEntryById: (token: string, id: number) =>
    apiRequest<ProgressEntryDto>(`/api/ProgressEntries/${id}`, {token}),
  createProgressEntry: (token: string, payload: CreateProgressEntryPayload) =>
    apiRequest<ProgressEntryDto>('/api/ProgressEntries', {
      method: 'POST',
      token,
      body: payload,
    }),
  updateProgressEntry: (token: string, id: number, payload: UpdateProgressEntryPayload) =>
    apiRequest<void>(`/api/ProgressEntries/${id}`, { method: 'PUT', token, body: payload }),
  deleteProgressEntry: (token: string, id: number) =>
    apiRequest<void>(`/api/ProgressEntries/${id}`, {method: 'DELETE', token}),

  // Role
  getRoles: (token: string) =>
    apiRequest<RoleDto[]>('/api/Roles', {token}),
  getRoleById: (token: string, id: number) =>
    apiRequest<RoleDto>(`/api/Roles/${id}`, {token}),
  createRole: (token: string, payload: CreateRolePayload) =>
    apiRequest<RoleDto>('/api/Roles', { method: 'POST', token, body: payload }),
  updateRole: (token: string, id: number, payload: CreateRolePayload) =>
    apiRequest<RoleDto>(`/api/Roles/${id}`, { method: 'PUT', token, body: payload }),
  deleteRole: (token: string, id: number) =>
    apiRequest<void>(`/api/Roles/${id}`, { method: 'DELETE', token }),

  // UserMembership
  getUserMemberships: (token: string) =>
    apiRequest<UserMembershipDto[]>('/api/UserMemberships', {token}),
  getUserMembershipById: (token: string, id: number) =>
    apiRequest<UserMembershipDto>(`/api/UserMemberships/${id}`, {token}),
  createUserMembership: (token: string, payload: CreateUserMembershipPayload) =>
    apiRequest<UserMembershipDto>('/api/UserMemberships', { method: 'POST', token, body: payload }),
  updateUserMembership: (token: string, id: number, payload: CreateUserMembershipPayload) =>
    apiRequest<UserMembershipDto>(`/api/UserMemberships/${id}`, { method: 'PUT', token, body: payload }),
  deleteUserMembership: (token: string, id: number) =>
    apiRequest<void>(`/api/UserMemberships/${id}`, { method: 'DELETE', token }),

  // WorkoutPlan
  getWorkoutPlans: (token: string) =>
    apiRequest<WorkoutPlanDto[]>('/api/WorkoutPlans', {token}),
  getWorkoutPlanById: (token: string, id: number) =>
    apiRequest<WorkoutPlanDto>(`/api/WorkoutPlans/${id}`, {token}),
  createWorkoutPlan: (token: string, payload: CreateWorkoutPlanPayload) =>
    apiRequest<WorkoutPlanDto>('/api/WorkoutPlans', {
      method: 'POST',
      token,
      body: payload,
    }),
  updateWorkoutPlan: (token: string, id: number, payload: UpdateWorkoutPlanPayload) =>
    apiRequest<void>(`/api/WorkoutPlans/${id}`, { method: 'PUT', token, body: payload }),
  deleteWorkoutPlan: (token: string, id: number) =>
    apiRequest<void>(`/api/WorkoutPlans/${id}`, {method: 'DELETE', token}),

  // WorkoutSession
  getWorkoutSessions: (token: string) =>
    apiRequest<WorkoutSessionDto[]>('/api/WorkoutSessions', {token}),
  getWorkoutSessionById: (token: string, id: number) =>
    apiRequest<WorkoutSessionDto>(`/api/WorkoutSessions/${id}`, {token}),
  createWorkoutSession: (token: string, payload: CreateWorkoutSessionPayload) =>
    apiRequest<WorkoutSessionDto>('/api/WorkoutSessions', {
      method: 'POST',
      token,
      body: payload,
    }),
  updateWorkoutSession: (token: string, id: number, payload: UpdateWorkoutSessionPayload) =>
    apiRequest<void>(`/api/WorkoutSessions/${id}`, { method: 'PUT', token, body: payload }),
  deleteWorkoutSession: (token: string, id: number) =>
    apiRequest<void>(`/api/WorkoutSessions/${id}`, {method: 'DELETE', token}),

  // WorkoutPlanExercise
  getWorkoutPlanExercises: (token: string) =>
    apiRequest<WorkoutPlanExerciseDto[]>('/api/WorkoutPlanExercises', {token}),
  getWorkoutPlanExerciseById: (token: string, id: number) =>
    apiRequest<WorkoutPlanExerciseDto>(`/api/WorkoutPlanExercises/${id}`, {token}),
  createWorkoutPlanExercise: (token: string, payload: CreateWorkoutPlanExercisePayload) =>
    apiRequest<WorkoutPlanExerciseDto>('/api/WorkoutPlanExercises', { method: 'POST', token, body: payload }),
  updateWorkoutPlanExercise: (token: string, id: number, payload: CreateWorkoutPlanExercisePayload) =>
    apiRequest<WorkoutPlanExerciseDto>(`/api/WorkoutPlanExercises/${id}`, { method: 'PUT', token, body: payload }),
  deleteWorkoutPlanExercise: (token: string, id: number) =>
    apiRequest<void>(`/api/WorkoutPlanExercises/${id}`, { method: 'DELETE', token }),
};
