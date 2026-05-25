import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle, StyleProp, ViewStyle } from 'react-native';

type SettingRowProps = {
  icon?: React.ReactNode;
  title: string;
  rightElement?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

const SettingRow = ({ icon, title, rightElement, titleStyle, onPress, containerStyle }: SettingRowProps) => {
  return (
    <TouchableOpacity
      style={[styles.rowContainer, containerStyle]}
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
    >
      <View style={styles.leftContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      {rightElement && <View>{rightElement}</View>}
    </TouchableOpacity>
  );
};

export default SettingRow;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
