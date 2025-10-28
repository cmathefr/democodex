export type NoteLetter =
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'A'
  | 'A#'
  | 'B';

export type ChordQuality =
  | 'Maj'
  | 'Min'
  | 'Dim'
  | 'Aug'
  | '7'
  | 'Maj7'
  | 'Min7';

export interface ChordDefinition {
  root: NoteLetter;
  quality: ChordQuality;
}

export interface ChordInstance extends ChordDefinition {
  midiNotes: number[];
  name: string;
}

export interface InversionOption {
  label: string;
  midiNotes: number[];
}

export const NOTE_ORDER: NoteLetter[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const BASE_MIDI = 60; // Middle C (C4)

const NOTE_TO_MIDI: Record<NoteLetter, number> = NOTE_ORDER.reduce(
  (acc, note, index) => {
    acc[note] = BASE_MIDI + index;
    return acc;
  },
  {} as Record<NoteLetter, number>
);

const QUALITY_INTERVALS: Record<ChordQuality, number[]> = {
  Maj: [0, 4, 7],
  Min: [0, 3, 7],
  Dim: [0, 3, 6],
  Aug: [0, 4, 8],
  '7': [0, 4, 7, 10],
  Maj7: [0, 4, 7, 11],
  Min7: [0, 3, 7, 10],
};

export const QUALITY_LABEL: Record<ChordQuality, string> = {
  Maj: 'Majeur',
  Min: 'Mineur',
  Dim: 'Diminué',
  Aug: 'Augmenté',
  '7': '7ème de dominante',
  Maj7: '7ème majeure',
  Min7: '7ème mineure',
};

export function wrapMidi(note: number): number {
  const cycle = 12;
  const result = ((note - BASE_MIDI) % cycle + cycle) % cycle + BASE_MIDI;
  return result;
}

export function getNoteLabel(midi: number): string {
  const offset = ((midi - BASE_MIDI) % 12 + 12) % 12;
  const octave = Math.floor((midi - 60) / 12) + 4;
  return `${NOTE_ORDER[offset]}${octave}`;
}

export function buildChord(def: ChordDefinition): ChordInstance {
  const base = NOTE_TO_MIDI[def.root];
  const intervals = QUALITY_INTERVALS[def.quality];
  const midiNotes = intervals.map((interval) => base + interval);
  return {
    ...def,
    midiNotes,
    name: `${def.root} ${QUALITY_LABEL[def.quality]}`,
  };
}

export function getInversions(chord: ChordInstance): InversionOption[] {
  const options: InversionOption[] = [];
  const total = chord.midiNotes.length;
  for (let i = 0; i < total; i += 1) {
    const rotated = chord.midiNotes
      .slice(i)
      .concat(chord.midiNotes.slice(0, i).map((note) => note + 12));
    const label = i === 0 ? 'Position fondamentale' : `${i}ᵉ renversement`;
    options.push({ label, midiNotes: rotated });
  }
  return options;
}

export function getAllChords(): ChordInstance[] {
  const chords: ChordInstance[] = [];
  for (const root of NOTE_ORDER) {
    for (const quality of Object.keys(QUALITY_INTERVALS) as ChordQuality[]) {
      chords.push(buildChord({ root, quality }));
    }
  }
  return chords;
}

export function getRandomChord(): ChordInstance {
  const chords = getAllChords();
  const index = Math.floor(Math.random() * chords.length);
  return chords[index];
}

export function getRandomOptions(correct: ChordInstance, count = 4): ChordInstance[] {
  const chords = getAllChords();
  const filtered = chords.filter((chord) => chord.name !== correct.name);
  const options = new Set<ChordInstance>();
  options.add(correct);
  while (options.size < count) {
    const index = Math.floor(Math.random() * filtered.length);
    options.add(filtered[index]);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}
