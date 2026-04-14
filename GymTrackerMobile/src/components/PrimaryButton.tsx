import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  tone?: 'primary' | 'secondary' | 'danger';
};

export function PrimaryButton({
  title,
  onPress,
  disabled,
  tone = 'primary',
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        tone === 'secondary'
          ? styles.secondary
          : tone === 'danger'
            ? styles.danger
            : styles.primary,
        disabled ? styles.disabled : undefined,
      ]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#1F8A70',
  },
  secondary: {
    backgroundColor: '#494741',
  },
  danger: {
    backgroundColor: '#B0462B',
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
