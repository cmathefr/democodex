import { useCallback } from 'react';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

import { PIANO_SAMPLES } from '../assets/pianoSamples';

const SAMPLE_MAP: Record<number, keyof typeof PIANO_SAMPLES> = {
  60: 'C4',
  61: 'Cs4',
  62: 'D4',
  63: 'Ds4',
  64: 'E4',
  65: 'F4',
  66: 'Fs4',
  67: 'G4',
  68: 'Gs4',
  69: 'A4',
  70: 'As4',
  71: 'B4',
  72: 'C5',
};

function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function getClosestSample(
  midi: number
): { midi: number; sampleKey: keyof typeof PIANO_SAMPLES } {
  const wrapped = ((midi - 60) % 12 + 12) % 12 + 60;
  const sampleMidi = SAMPLE_MAP[wrapped] ? wrapped : 60;
  return { midi: sampleMidi, sampleKey: SAMPLE_MAP[sampleMidi] };
}

export function useSoundPlayer() {
  const playChord = useCallback(async (midiNotes: number[]) => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
    });

    const sounds = await Promise.all(
      midiNotes.map(async (midi) => {
        const { midi: baseMidi, sampleKey } = getClosestSample(midi);
        const source = { uri: PIANO_SAMPLES[sampleKey] };
        const { sound } = await Audio.Sound.createAsync(source, { volume: 0.7 });
        const baseFrequency = midiToFrequency(baseMidi);
        const targetFrequency = midiToFrequency(midi);
        const rate = targetFrequency / baseFrequency;
        await sound.setRateAsync(rate, false);
        return sound;
      })
    );

    const completionPromises = sounds.map(
      (sound) =>
        new Promise<void>((resolve) => {
          sound.setOnPlaybackStatusUpdate((status) => {
            const success = status as AVPlaybackStatusSuccess;
            if (!success.isLoaded || success.didJustFinish) {
              sound.unloadAsync().finally(() => {
                sound.setOnPlaybackStatusUpdate(undefined);
                resolve();
              });
            }
          });
        })
    );

    await Promise.all(sounds.map((sound) => sound.playAsync()));
    await Promise.all(completionPromises);
  }, []);

  return { playChord };
}

export default useSoundPlayer;
