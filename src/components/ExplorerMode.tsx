import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { ChordSelector } from './ChordSelector';
import { ChordStaff } from './ChordStaff';
import { buildChord, ChordQuality, NoteLetter, getNoteLabel } from '../utils/music';
import { useSoundPlayer } from '../hooks/useSoundPlayer';

export const ExplorerMode: React.FC = () => {
  const { playChord } = useSoundPlayer();
  const [root, setRoot] = useState<NoteLetter>('C');
  const [quality, setQuality] = useState<ChordQuality>('Maj');

  const chord = useMemo(() => buildChord({ root, quality }), [root, quality]);

  return (
    <View>
      <Text style={styles.title}>Explorer les accords</Text>
      <Text style={styles.subtitle}>
        Sélectionne un accord pour visualiser ses notes sur la portée et écouter le rendu piano.
      </Text>
      <ChordSelector
        root={root}
        quality={quality}
        onRootChange={(value) => setRoot(value)}
        onQualityChange={(value) => setQuality(value)}
      />
      <ChordStaff midiNotes={chord.midiNotes} />
      <Pressable style={styles.playButton} onPress={() => playChord(chord.midiNotes)}>
        <Text style={styles.playLabel}>Jouer l'accord</Text>
      </Pressable>
      <Text style={styles.noteDetails}>
        Notes : {chord.midiNotes.map((note) => getNoteLabel(note)).join('  ')}
      </Text>
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
    marginBottom: 20,
  },
  playButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  playLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  noteDetails: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.muted,
  },
});

export default ExplorerMode;
