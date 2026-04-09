//odpowiada za komunikacje z backendem w zakresie autoryzacji, logowania i rejestracji uzytkownikow
import {apiRequest} from './http';
import {AuthResponseDto, LoginPayload, RegisterPayload} from '../types/api';

export function loginRequest(payload: LoginPayload) {
  return apiRequest<AuthResponseDto>('/api/Auth/login', {
    method: 'POST',
    body: payload,
  });
}

export function registerRequest(payload: RegisterPayload) {
  return apiRequest<AuthResponseDto>('/api/Auth/register', {
    method: 'POST',
    body: payload,
  });
}
