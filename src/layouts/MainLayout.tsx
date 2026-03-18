import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {AppHeader} from '../components/AppHeader';
import {BottomTabBar} from '../components/BottomTabBar';
import {TabKey} from '../data/navigation';

type MainLayoutProps = {
  title: string;
  actionLabel: string;
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
  children: React.ReactNode;
};

export function MainLayout({
  title,
  actionLabel,
  activeTab,
  onTabPress,
  children,
}: MainLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F1EA" />

      <View style={styles.appShell}>
        <AppHeader title={title} actionLabel={actionLabel} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>

        <BottomTabBar activeTab={activeTab} onTabPress={onTabPress} />
      </View>
    </SafeAreaView>
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
