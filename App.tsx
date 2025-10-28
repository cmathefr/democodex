import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme/colors';
import { ExplorerMode } from './src/components/ExplorerMode';
import { ExerciseMode } from './src/components/ExerciseMode';
import { AdvancedMode } from './src/components/AdvancedMode';

type ModeKey = 'explorer' | 'exercise' | 'advanced';

const MODE_LABELS: Record<ModeKey, string> = {
  explorer: 'Exploration',
  exercise: 'Exercices',
  advanced: 'Renversements',
};

export default function App() {
  const [mode, setMode] = useState<ModeKey>('explorer');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.appTitle}>Chord Learner</Text>
        <Text style={styles.appSubtitle}>
          Maîtrise les accords au piano grâce à des visualisations interactives et des exercices.
        </Text>
        <View style={styles.tabBar}>
          {(Object.keys(MODE_LABELS) as ModeKey[]).map((key) => {
            const isActive = mode === key;
            return (
              <Pressable
                key={key}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setMode(key)}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {MODE_LABELS[key]}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {mode === 'explorer' && <ExplorerMode />}
          {mode === 'exercise' && <ExerciseMode />}
          {mode === 'advanced' && <AdvancedMode />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  appSubtitle: {
    marginTop: 8,
    color: colors.muted,
    marginBottom: 24,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontWeight: '600',
    color: colors.text,
  },
  tabLabelActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 48,
    paddingTop: 8,
  },
});
