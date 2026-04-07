import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type AppHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function AppHeader({
  title,
  actionLabel,
  onActionPress,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>GymFlow</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {actionLabel ? (
        <Pressable style={styles.action} onPress={onActionPress}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.headerSpacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#6D6A63',
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F241F',
  },
  action: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 21,
    backgroundColor: '#1F8A70',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1F241F',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 8},
    elevation: 4,
  },
  actionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 42,
  },
});
