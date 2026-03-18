import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'; //zamiast SafeAreaView używamy SafeAreaProvider, który zapewnia kontekst dla całej aplikacji i pozwala na korzystanie z bezpiecznych obszarów na różnych urządzeniach, bo DevTools pokazywał warnig z SafeAreaView
import {AppHeader} from '../components/AppHeader';
import {BottomTabBar} from '../components/BottomTabBar';
import {TabKey} from '../data/navigation';

type MainLayoutProps = {
  title: string;
  actionLabel: string;
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void; //funkcja, która przyjmuje tab jako argument i nie zwraca nic (void)
  children: React.ReactNode; //wszystko co jest renderowane wewnątrz MainLayout, czyli zawartość ekranu, która będzie się zmieniać w zależności od aktywnej zakładki
};

export function MainLayout({
  title,
  actionLabel,
  activeTab,
  onTabPress,
  children,
}: MainLayoutProps) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F1EA" />
        <View style={styles.appShell}>
          <AppHeader title={title} actionLabel={actionLabel} />
          <ScrollView
            contentContainerStyle={styles.content}
            //ukrywa pasek przewijania, aby interfejs był bardziej estetyczny, zwłaszcza jeśli zawartość jest długa i wymaga przewijania
            showsVerticalScrollIndicator={false}>
            {/* Renderuje dzieci przekazane do MainLayout, czyli zawartość ekranu, która będzie się zmieniać w zależności od aktywnej zakładki */}
            {children}
          </ScrollView>
          {/*Renderuje dolny pasek nawigacyjny, który pozwala użytkownikowi przełączać się między różnymi zakładkami aplikacji. Przekazuje activeTab i onTabPress jako propsy, aby BottomTabBar mógł odpowiednio reagować na interakcje użytkownika  */}
          <BottomTabBar activeTab={activeTab} onTabPress={onTabPress} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, //flex: 1 oznacza, że ten komponent zajmie całą dostępną przestrzeń, co jest ważne dla SafeAreaProvider, aby mógł poprawnie obliczyć bezpieczne obszary i zapewnić odpowiednie marginesy na różnych urządzeniach
    backgroundColor: '#F4F1EA',
  },
  appShell: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
