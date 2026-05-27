import React from 'react';
import { StyleSheet, View } from 'react-native';

type StorageProgressBarProps = {
  progress: number;
};

const StorageProgressBar = ({ progress }: StorageProgressBarProps) => {
  // progress expect value between 0 and 1 (e.g. 0.042 for 4.2%)
  const boundedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={styles.track}>
      <View style={[styles.filled, { flex: boundedProgress }]} />
      <View style={{ flex: 1 - boundedProgress }} />
    </View>
  );
};

export default StorageProgressBar;

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: '#2C2C2E',
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  filled: {
    backgroundColor: '#5E5CE6',
    borderRadius: 4,
  },
});
