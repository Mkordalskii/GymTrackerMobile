import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>GymFlow Mobile</Text>
            <Text style={styles.title}>
              {mode === 'login' ? 'Zaloguj sie' : 'Utworz konto'}
            </Text>
            <Text style={styles.subtitle}>
              Frontend jest juz podpiety pod API i korzysta z JWT oraz
              prawdziwych endpointow.
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
              keyboardType="email-address"
            />

            <FormField
              label="Haslo"
              value={password}
              onChangeText={setPassword}
              placeholder="Wpisz haslo"
              secureTextEntry
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
                  onChangeMode(mode === 'login' ? 'register' : 'login')
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
    flex: 1,
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
