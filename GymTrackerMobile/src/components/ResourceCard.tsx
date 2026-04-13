import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

type ResourceCardProps = {
  title: string;
  description: string;
  meta?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function ResourceCard({
  title,
  description,
  meta,
  onEdit,
  onDelete,
}: ResourceCardProps) {
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const handleDeletePress = () => {
    setIsConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmVisible(false);
    onDelete?.();
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.main}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        </View>
        <View style={styles.actions}>
          {onEdit ? (
            <Pressable onPress={onEdit} style={styles.editButton}>
              <Text style={styles.editText}>Edytuj</Text>
            </Pressable>
          ) : null}
          {onDelete ? (
            <Pressable onPress={handleDeletePress} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Usun</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <Modal
        visible={isConfirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsConfirmVisible(false)}>
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Potwierdz usuniecie</Text>
            <Text style={styles.confirmText}>
              Czy na pewno chcesz usunac ten element?
            </Text>
            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setIsConfirmVisible(false)}
                style={[styles.confirmButton, styles.cancelButton]}>
                <Text style={[styles.confirmButtonText, styles.cancelButtonText]}>
                  Anuluj
                </Text>
              </Pressable>
              <Pressable
                onPress={handleConfirmDelete}
                style={[styles.confirmButton, styles.confirmDeleteButton]}>
                <Text style={[styles.confirmButtonText, styles.confirmDeleteText]}>
                  Usun
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF7E8',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  main: {
    flex: 1,
  },
  title: {
    color: '#1F241F',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    color: '#6D6A63',
    fontSize: 14,
    lineHeight: 20,
  },
  meta: {
    color: '#494741',
    fontSize: 13,
    marginTop: 10,
    fontWeight: '700',
  },
  actions: {
    alignSelf: 'flex-start',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#D7EEDF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editText: {
    color: '#1A6E58',
    fontSize: 12,
    fontWeight: '800',
  },
  deleteButton: {
    backgroundColor: '#F8D8D2',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteText: {
    color: '#B0462B',
    fontSize: 12,
    fontWeight: '800',
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 36, 31, 0.35)',
    justifyContent: 'center',
    padding: 24,
  },
  confirmCard: {
    backgroundColor: '#F4F1EA',
    borderRadius: 24,
    padding: 20,
  },
  confirmTitle: {
    color: '#1F241F',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  confirmText: {
    color: '#6D6A63',
    fontSize: 14,
    lineHeight: 20,
  },
  confirmActions: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  confirmButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#E7E1D5',
  },
  confirmDeleteButton: {
    backgroundColor: '#F8D8D2',
  },
  confirmButtonText: {
    fontSize: 13,
    fontWeight: '800',
  },
  cancelButtonText: {
    color: '#494741',
  },
  confirmDeleteText: {
    color: '#B0462B',
  },
});
