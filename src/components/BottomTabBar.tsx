import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {TabKey, tabs} from '../data/navigation';

type BottomTabBarProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

export function BottomTabBar({activeTab, onTabPress}: BottomTabBarProps) {
  return (
    <View style={styles.bottomBar}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.tabButton}>
            <View
              style={[
                styles.tabIcon,
                isActive ? styles.tabIconActive : undefined,
              ]}>
              <Text
                style={[
                  styles.tabIconText,
                  isActive ? styles.tabIconTextActive : undefined,
                ]}>
                {tab.icon}
              </Text>
            </View>
            <Text
              style={[
                styles.tabLabel,
                isActive ? styles.tabLabelActive : undefined,
              ]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFF7E8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  tabIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabIconActive: {
    backgroundColor: '#1F8A70',
  },
  tabIconText: {
    color: '#6D6A63',
    fontWeight: '800',
    fontSize: 12,
  },
  tabIconTextActive: {
    color: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 12,
    color: '#6D6A63',
    fontWeight: '700',
  },
  tabLabelActive: {
    color: '#1F241F',
  },
});
