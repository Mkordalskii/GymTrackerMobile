import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

type ModalCardProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function ModalCard({
  visible,
  title,
  onClose,
  children,
}: ModalCardProps) {
  return (
    <Modal animationType="slide" visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>Zamknij</Text>
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 36, 31, 0.35)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#F4F1EA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '88%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F241F',
  },
  close: {
    color: '#1F8A70',
    fontSize: 14,
    fontWeight: '700',
  },
});
