import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type MessageBannerProps = {
  tone: 'error' | 'success' | 'info';
  text: string;
};

export function MessageBanner({tone, text}: MessageBannerProps) {
  return (
    <View
      style={[
        styles.container,
        tone === 'error'
          ? styles.error
          : tone === 'success'
            ? styles.success
            : styles.info,
      ]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  error: {
    backgroundColor: '#F8D8D2',
  },
  success: {
    backgroundColor: '#D9EFE8',
  },
  info: {
    backgroundColor: '#E6E1D7',
  },
  text: {
    color: '#1F241F',
    fontSize: 14,
    lineHeight: 20,
  },
});
