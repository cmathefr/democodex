import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { ChordQuality, NOTE_ORDER, NoteLetter, QUALITY_LABEL } from '../utils/music';

interface Props {
  root: NoteLetter;
  quality: ChordQuality;
  onRootChange: (root: NoteLetter) => void;
  onQualityChange: (quality: ChordQuality) => void;
}

const QUALITY_ORDER: ChordQuality[] = ['Maj', 'Min', 'Dim', 'Aug', '7', 'Maj7', 'Min7'];

export const ChordSelector: React.FC<Props> = ({
  root,
  quality,
  onRootChange,
  onQualityChange,
}) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Fondamentale</Text>
      <View style={styles.row}>
        {NOTE_ORDER.map((note) => {
          const isSelected = note === root;
          return (
            <Pressable
              key={note}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onRootChange(note)}
            >
              <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>{note}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Qualité</Text>
      <View style={styles.row}>
        {QUALITY_ORDER.map((item) => {
          const isSelected = item === quality;
          return (
            <Pressable
              key={item}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onQualityChange(item)}
            >
              <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                {QUALITY_LABEL[item]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sectionSpacing: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
    margin: 4,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    color: colors.text,
    fontSize: 12,
  },
  chipLabelSelected: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default ChordSelector;
