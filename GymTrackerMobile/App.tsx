import React, {useCallback, useMemo, useState} from 'react';

import {loginRequest, registerRequest} from './src/api/auth'; // importujemy funkcje do logowania i rejestracji z api/auth, zeby moc je wywolywac w funkcjach handleLogin i handleRegister, co pozwala nam zalogowac sie lub zarejestrowac uzytkownika i uzyskac token potrzebny do dalszej pracy z API
import {gymApi} from './src/api/gym'; // importujemy gymApi, zeby moc pobierac dane potrzebne do hydratacji sesji, czyli liste uzytkownikow, zeby dopasowac zalogowanego uzytkownika do danych zwroconych przez endpoint logowania/rejestracji i uzyskac jego userId, co jest potrzebne do dalszej pracy z API
import {AuthFormScreen} from './src/screens/AuthFormScreen'; // importujemy ekran logowania/rejestracji, zeby moc go wyswietlic, gdy uzytkownik nie jest zalogowany, a gdy sie zaloguje, to wyswietlic glowny ekran aplikacji (ShellScreen)
import {ShellScreen} from './src/screens/ShellScreen'; // importujemy glowny ekran aplikacji, zeby moc go wyswietlic po zalogowaniu sie uzytkownika. ShellScreen zawiera nawigacje i wszystkie inne ekrany, dlatego jest to centralny punkt naszej aplikacji, do ktorego przechodzimy po udanym logowaniu/rejestracji
import {AuthMode, AuthSession} from './src/types/api'; // importujemy typy AuthMode i AuthSession, zeby moc ich uzywac w naszej aplikacji. AuthMode pozwala nam okreslic, czy aktualnie wyswietlamy ekran logowania, czy rejestracji, a AuthSession to typ danych przechowujacych informacje o aktualnej sesji uzytkownika, takie jak token, email, role, expiresAtUtc i userId, co jest potrzebne do dalszej pracy z API i zarzadzania stanem zalogowania w aplikacji

function App(): React.JSX.Element {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // funkcja tworzy pelny obiekt AuthSession na podstawie danych zwroconych przez endpoint logowania/rejestracji (token, email, role, expiresAtUtc) oraz dodatkowo pobiera liste uzytkownikow z API, zeby dopasowac zalogowanego uzytkownika do danych zwroconych przez endpoint i uzyskac jego userId, ktory jest potrzebny do dalszej pracy z API. Funkcja jest opakowana w useCallback, zeby nie byla tworzona od nowa przy kazdym renderze, a tylko wtedy, gdy sie zmieni (w tym przypadku nie ma zadnych zaleznosci, wiec funkcja bedzie tworzona tylko raz)
  const hydrateSession = useCallback(
    async (
      token: string,
      email: string,
      role: string,
      expiresAtUtc: string,
    ): Promise<AuthSession> => {
      const users = await gymApi.getUsers(token);
      const currentUser = users.find(
        item => item.email.toLowerCase() === email.toLowerCase(),
      );

      if (!currentUser) {
        throw new Error('Nie udalo sie dopasowac zalogowanego uzytkownika.');
      }

      return {
        token,
        email,
        role,
        expiresAtUtc,
        userId: currentUser.id,
      };
    },
    [], // pusta tablica czyli funkcja wykona sie tylko raz przy pierwszym renderze i zostanie zapamietana
  );

  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await loginRequest({email, password});
    setSession(
      await hydrateSession(
        response.token,
        response.email,
        response.role,
        response.expiresAtUtc,
      ),
    );
  }, [hydrateSession]);

  const handleRegister = useCallback(
    async (name: string, email: string, password: string) => {
      const response = await registerRequest({
        name,
        email,
        password,
        roleId: 2,
      });
      setSession(
        await hydrateSession(
          response.token,
          response.email,
          response.role,
          response.expiresAtUtc,
        ),
      );
    },
    [hydrateSession],
  );

  const handleLogout = useCallback(() => {
    setSession(null);
    setAuthMode('login');
  }, []);

  const authScreen = useMemo(() => {
    return (
      <AuthFormScreen
        mode={authMode}
        onChangeMode={setAuthMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }, [authMode, handleLogin, handleRegister]);

  if (!session) {
    return authScreen;
  }

  return <ShellScreen session={session} onLogout={handleLogout} />;
}

export default App;
