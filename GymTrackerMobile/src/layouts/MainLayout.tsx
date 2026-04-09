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
import type {TabKey} from '../data/navigation';

type MainLayoutProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  children: React.ReactNode;
};

export function MainLayout({
  title,
  actionLabel,
  onActionPress,
  activeTab,
  onTabPress,
  children,
}: MainLayoutProps) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F1EA" />

      <View style={styles.appShell}>
        <AppHeader
          title={title}
          actionLabel={actionLabel}
          onActionPress={onActionPress}
        />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>

        <BottomTabBar activeTab={activeTab} onTabPress={onTabPress} />
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
