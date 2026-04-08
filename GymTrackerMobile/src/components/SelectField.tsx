import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  emptyMessage?: string;
};

export function SelectField({
  label,
  value,
  options,
  onChange,
  emptyMessage = 'Brak dostepnych opcji.',
}: SelectFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      {options.length === 0 ? (
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      ) : (
        <View style={styles.optionsWrap}>
          {options.map(option => {
            const isActive = option.value === value;
            return (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
                style={[styles.option, isActive ? styles.optionActive : undefined]}>
                <Text style={[styles.optionText, isActive ? styles.optionTextActive : undefined]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#494741',
    marginBottom: 8,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#E7E1D5',
  },
  optionActive: {
    backgroundColor: '#1F8A70',
  },
  optionText: {
    color: '#494741',
    fontWeight: '700',
    fontSize: 13,
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  emptyText: {
    color: '#6D6A63',
    fontSize: 13,
  },
});
