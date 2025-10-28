import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import {
  ChordInstance,
  getRandomChord,
  getRandomOptions,
} from '../utils/music';
import { useSoundPlayer } from '../hooks/useSoundPlayer';

interface ExerciseQuestion {
  answer: ChordInstance;
  options: ChordInstance[];
}

export const ExerciseMode: React.FC = () => {
  const { playChord } = useSoundPlayer();
  const [question, setQuestion] = useState<ExerciseQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const buildQuestion = useCallback(() => {
    const answer = getRandomChord();
    const options = getRandomOptions(answer, 4);
    setQuestion({ answer, options });
    setSelected(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    buildQuestion();
  }, [buildQuestion]);

  const handlePlay = useCallback(async () => {
    if (question) {
      await playChord(question.answer.midiNotes);
    }
  }, [playChord, question]);

  const handleChoice = useCallback(
    (choice: ChordInstance) => {
      if (!question) return;
      setSelected(choice.name);
      const success = choice.name === question.answer.name;
      setIsCorrect(success);
    },
    [question]
  );

  const optionButtons = useMemo(() => {
    if (!question) return null;
    return question.options.map((option) => {
      const isSelected = selected === option.name;
      const backgroundColor = isSelected
        ? isCorrect
          ? colors.success
          : colors.danger
        : colors.card;
      const borderColor = isSelected ? backgroundColor : colors.muted;
      return (
        <Pressable
          key={option.name}
          style={[styles.optionButton, { backgroundColor, borderColor }]}
          onPress={() => handleChoice(option)}
        >
          <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
            {option.name}
          </Text>
        </Pressable>
      );
    });
  }, [handleChoice, isCorrect, question, selected]);

  return (
    <View>
      <Text style={styles.title}>Devine l'accord</Text>
      <Text style={styles.subtitle}>
        Écoute l'accord et sélectionne la bonne réponse parmi les propositions.
      </Text>
      <Pressable style={styles.playButton} onPress={handlePlay}>
        <Text style={styles.playLabel}>Écouter l'accord</Text>
      </Pressable>
      <View style={styles.optionsContainer}>{optionButtons}</View>
      {isCorrect !== null && (
        <Text style={[styles.feedback, isCorrect ? styles.correct : styles.incorrect]}>
          {isCorrect ? 'Bravo !' : `Réponse correcte : ${question?.answer.name}`}
        </Text>
      )}
      <Pressable style={styles.newButton} onPress={buildQuestion}>
        <Text style={styles.newLabel}>Nouvel accord</Text>
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
  playButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  playLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  optionsContainer: {
    marginTop: 4,
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  optionLabel: {
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: '#fff',
  },
  feedback: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  correct: {
    color: colors.success,
  },
  incorrect: {
    color: colors.danger,
  },
  newButton: {
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  newLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ExerciseMode;
