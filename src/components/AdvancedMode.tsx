import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { ChordSelector } from './ChordSelector';
import { ChordStaff } from './ChordStaff';
import {
  buildChord,
  ChordQuality,
  getInversions,
  InversionOption,
  NoteLetter,
  getNoteLabel,
} from '../utils/music';
import { useSoundPlayer } from '../hooks/useSoundPlayer';

export const AdvancedMode: React.FC = () => {
  const { playChord } = useSoundPlayer();
  const [root, setRoot] = useState<NoteLetter>('C');
  const [quality, setQuality] = useState<ChordQuality>('Maj');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const chord = useMemo(() => buildChord({ root, quality }), [root, quality]);
  const inversions = useMemo(() => getInversions(chord), [chord]);
  const selectedInversion = inversions[selectedIndex] ?? inversions[0];

  const handlePlay = async (option: InversionOption) => {
    await playChord(option.midiNotes);
  };

  return (
    <View>
      <Text style={styles.title}>Renversements d'accords</Text>
      <Text style={styles.subtitle}>
        Explore les renversements pour mieux comprendre la disposition des notes.
      </Text>
      <View style={styles.selectorContainer}>
        <ChordSelector
          root={root}
          quality={quality}
          onRootChange={(value) => {
            setRoot(value);
            setSelectedIndex(0);
          }}
          onQualityChange={(value) => {
            setQuality(value);
            setSelectedIndex(0);
          }}
        />
      </View>
      <View style={styles.inversionContainer}>
        {inversions.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Pressable
              key={option.label}
              style={[styles.inversionButton, isSelected && styles.inversionSelected]}
              onPress={() => {
                setSelectedIndex(index);
                handlePlay(option);
              }}
            >
              <Text
                style={[styles.inversionLabel, isSelected && styles.inversionLabelSelected]}
              >
                {option.label}
              </Text>
              <Text style={[styles.notesLabel, isSelected && styles.inversionLabelSelected]}>
                {option.midiNotes.map((note) => getNoteLabel(note)).join('  ')}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ChordStaff midiNotes={selectedInversion.midiNotes} />
      <Pressable
        style={[styles.playButton, styles.secondaryButton]}
        onPress={() => handlePlay(selectedInversion)}
      >
        <Text style={[styles.playLabel, styles.secondaryLabel]}>Réécouter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    color: colors.muted,
    marginBottom: 16,
  },
  selectorContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  inversionContainer: {
    flexDirection: 'column',
  },
  inversionButton: {
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  inversionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inversionLabel: {
    color: colors.text,
    fontWeight: '600',
  },
  inversionLabelSelected: {
    color: '#fff',
  },
  notesLabel: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 12,
  },
  playButton: {
    marginTop: 16,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  playLabel: {
    fontWeight: '600',
  },
  secondaryLabel: {
    color: colors.primary,
  },
});

export default AdvancedMode;
