// plik odpowiedzialny za komunikacje z backendem, obsluguje bledy i mapuje je na przyjazne komunikaty dla uzytkownika
import {API_BASE_URL} from './config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
  method?: HttpMethod;
  token?: string;
  body?: unknown;
};

type ApiErrorPayload = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string | null;
  errors?: Record<string, string[]>;
};

const mapApiErrorToMessage = (error: ApiErrorPayload): string => {
  if (error.errors) {
    const validationMessages = Object.values(error.errors).flat().filter(Boolean); // filter(Boolean) ponieważ usuwa wszystkie wartości, które są falsy (null, undefined, empty string, 0, false). W tym przypadku chcemy usunąć puste komunikaty błędów, które mogą się pojawić w tablicy.
    if (validationMessages.length > 0) {
      return validationMessages.join('\n');
    }
  }

  if (error.status === 401 || error.type === 'Unauthorized') {
    return 'Nieprawidlowy email lub haslo.';
  }

  if (error.status === 403) {
    return 'Brak uprawnien do wykonania tej operacji.';
  }

  if (error.status === 404) {
    return 'Nie znaleziono zasobu.';
  }

  if (error.status === 409) {
    return 'Dane konfliktuja z istniejacym rekordem.';
  }

  if (error.title) {
    return error.title;
  }

  if (error.detail) {
    return error.detail;
  }

  return 'Wystapil blad podczas komunikacji z serwerem.';
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token
        ? {Authorization: `Bearer ${options.token}`}
        : undefined), // ... operator rozkłada obiekt na pojedyncze pary klucz-wartość. Jeśli options.token jest prawdziwy (nie null, undefined, itp.), to dodajemy do nagłówków parę Authorization
    },
    body: options.body ? JSON.stringify(options.body) : undefined, 
  }); // fetch automatycznie ustawia Content-Type na application/json, gdy body jest obiektem, ale explicite ustawiamy to dla pewności. Jeśli body jest undefined, to nie ustawiamy go w ogóle, ponieważ niektóre serwery mogą mieć problem z obsługą nagłówka Content-Type bez rzeczywistego ciała żądania.

  const responseText = await response.text();

  if (!response.ok) { // statusy poniżej 200 lub powyżej 299 są traktowane jako błędy
    if (!responseText.trim()) {
      throw new Error('Wystapil blad podczas komunikacji z serwerem.');
    }

    let parsedError: ApiErrorPayload | null = null;
    try {
      parsedError = JSON.parse(responseText) as ApiErrorPayload;
    } catch {
      parsedError = null;
    }

    if (parsedError) {
      throw new Error(mapApiErrorToMessage(parsedError));
    }

    // jeśli nie udało się sparsować błędu, zwracamy surowy tekst odpowiedzi jako komunikat błędu
    throw new Error(responseText);
  }

  if (response.status === 204 || !responseText.trim()) {
    return undefined as T;
  }

  return JSON.parse(responseText) as T;
}
