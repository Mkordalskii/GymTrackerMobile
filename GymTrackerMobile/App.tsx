import React, {useCallback, useMemo, useState} from 'react';

import {loginRequest, registerRequest} from './src/api/auth';
import {gymApi} from './src/api/gym';
import {AuthFormScreen} from './src/screens/AuthFormScreen';
import {ShellScreen} from './src/screens/ShellScreen';
import {AuthMode, AuthSession} from './src/types/api';

function App(): React.JSX.Element {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

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
    [],
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
