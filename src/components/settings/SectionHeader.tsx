import React from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

type SectionHeaderProps = {
  title: string;
  textStyle?: StyleProp<TextStyle>;
};

const SectionHeader = ({ title, textStyle }: SectionHeaderProps) => {
  return <Text style={[styles.headerText, textStyle]}>{title}</Text>;
};

export default SectionHeader;

const styles = StyleSheet.create({
  headerText: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: 24,
    marginBottom: 8,
    paddingLeft: 4,
  },
});
