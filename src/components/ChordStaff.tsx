import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';
import { getNoteLabel } from '../utils/music';

interface Props {
  midiNotes: number[];
}

const STAFF_LINE_SPACING = 14;
const STAFF_WIDTH = 220;
const NOTE_RADIUS = 7;

function midiToStaffOffset(midi: number): number {
  // Reference: E4 sits on the bottom staff line in treble clef
  const referenceMidi = 64; // E4
  const semitoneDiff = midi - referenceMidi;
  return (-semitoneDiff / 2) * STAFF_LINE_SPACING;
}

export const ChordStaff: React.FC<Props> = ({ midiNotes }) => {
  const sorted = [...midiNotes].sort((a, b) => a - b);
  const minOffset = Math.min(...sorted.map(midiToStaffOffset)) - STAFF_LINE_SPACING;
  const maxOffset = Math.max(...sorted.map(midiToStaffOffset)) + STAFF_LINE_SPACING;
  const viewHeight = maxOffset - minOffset + STAFF_LINE_SPACING * 4;

  return (
    <View style={styles.wrapper}>
      <Svg width={STAFF_WIDTH} height={viewHeight}>
        {Array.from({ length: 5 }).map((_, index) => {
          const y = index * STAFF_LINE_SPACING + STAFF_LINE_SPACING;
          return (
            <Line
              key={`line-${index}`}
              x1={10}
              x2={STAFF_WIDTH - 10}
              y1={y}
              y2={y}
              stroke={colors.muted}
              strokeWidth={1.5}
            />
          );
        })}
        {sorted.map((note) => {
          const y = midiToStaffOffset(note) - minOffset + STAFF_LINE_SPACING * 2;
          return (
            <Circle
              key={`note-${note}`}
              cx={STAFF_WIDTH / 2}
              cy={y}
              r={NOTE_RADIUS}
              fill={colors.primary}
            />
          );
        })}
      </Svg>
      <View style={styles.labels}>
        {sorted.map((note) => (
          <Text key={`label-${note}`} style={styles.label}>
            {getNoteLabel(note)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  label: {
    color: colors.text,
    fontWeight: '600',
    marginHorizontal: 6,
  },
});

export default ChordStaff;
