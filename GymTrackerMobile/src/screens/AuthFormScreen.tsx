import React, {useState} from 'react';
import {
  KeyboardAvoidingView, // przesuwa zawartosc ekranu w gore gdy klawiatura jest otwarta, zeby pola formularza nie byly zasloniete przez klawiature, co poprawia uzytecznosc ekranu logowania i rejestracji
  Platform, //sprawdza na jakim systemie operacyjnym jest uruchomiona aplikacja, zeby dostosowac zachowanie KeyboardAvoidingView tylko dla iOS, bo na Androidzie nie jest to potrzebne
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {FormField} from '../components/FormField';
import {MessageBanner} from '../components/MessageBanner';
import {PrimaryButton} from '../components/PrimaryButton';
import {AuthMode} from '../types/api';

type AuthFormScreenProps = {
  mode: AuthMode;
  onChangeMode: (mode: AuthMode) => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (name: string, email: string, password: string) => Promise<void>;
};

export function AuthFormScreen({
  mode,
  onChangeMode,
  onLogin,
  onRegister,
}: AuthFormScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ten stan pozwala nam zablokowac przycisk logowania/rejestracji podczas trwania operacji, zeby zapobiec wielokrotnemu wysylaniu formularza i pokazac uzytkownikowi, ze cos sie dzieje po kliknieciu przycisku

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await onLogin(email.trim(), password);
      } else {
        await onRegister(name.trim(), email.trim(), password);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nie udalo sie wykonac operacji.',
      );
    } finally {
      setIsSubmitting(false); // odblokowujemy przycisk po zakonczeniu operacji, niezaleznie od tego, czy sie powiodla, czy nie, zeby uzytkownik mogl sprobowac ponownie w przypadku bledu
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}> // dla iOS ustawiamy behavior na 'padding', co sprawia, ze zawartosc ekranu jest przesuwana w gore o wysokosc klawiatury, a dla Androida nie ustawiamy zadnego behavior, bo na Androidzie system automatycznie przesuwa zawartosc, gdy klawiatura jest otwarta, wiec nie jest to potrzebne
        <ScrollView contentContainerStyle={styles.content}> // przewijanie zawartosci ekranu, zeby uzytkownik mogl przewinac do pol formularza, jesli ekran jest za maly, zeby pomiescic wszystko bez przewijania
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>GymFlow Mobile</Text>
            <Text style={styles.title}>
              {mode === 'login' ? 'Zaloguj sie' : 'Utworz konto'}
            </Text>
            <Text style={styles.subtitle}>
              Zaloguj sie i korzystaj z aplikacji
            </Text>
          </View>

          <View style={styles.formCard}>
            {error ? <MessageBanner tone="error" text={error} /> : null}

            {mode === 'register' ? (
              <FormField
                label="Imie i nazwisko"
                value={name}
                onChangeText={setName}
                placeholder="Jan Kowalski"
              />
            ) : null}

            <FormField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="user@gym.com"
              keyboardType="email-address" // pokazuje klawiature dostosowana do wpisywania adresu email, zeby uzytkownik mial latwiejszy dostep do znaku @ i kropki, co poprawia uzytecznosc formularza logowania i rejestracji
            />

            <FormField
              label="Haslo"
              value={password}
              onChangeText={setPassword}
              placeholder="Wpisz haslo"
              secureTextEntry // ukrywa wpisywane haslo
            />

            <PrimaryButton
              title={
                isSubmitting
                  ? 'Przetwarzanie...'
                  : mode === 'login'
                    ? 'Zaloguj'
                    : 'Zarejestruj'
              }
              onPress={handleSubmit}
              disabled={isSubmitting}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {mode === 'login' ? 'Nie masz konta?' : 'Masz juz konto?'}
              </Text>
              <Text
                onPress={() =>
                  onChangeMode(mode === 'login' ? 'register' : 'login') // przełączanie między trybem logowania a rejestracji po kliknięciu w link, zeby uzytkownik mogl latwo zmienic tryb, jesli pomylil sie lub chce sie zarejestrowac zamiast logowac
                }
                style={styles.switchLink}>
                {mode === 'login' ? 'Zarejestruj sie' : 'Wroc do logowania'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // 1 zajmuje caly ekran
    backgroundColor: '#F4F1EA',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  hero: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#6D6A63',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: '#1F241F',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#6D6A63',
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    backgroundColor: '#FDF7EB',
    borderRadius: 28,
    padding: 20,
  },
  switchRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  switchText: {
    color: '#6D6A63',
    fontSize: 14,
  },
  switchLink: {
    color: '#1F8A70',
    fontSize: 14,
    fontWeight: '700',
  },
});
