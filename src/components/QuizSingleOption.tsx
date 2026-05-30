import React, { memo, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { OptionPill } from './OptionPill';

type QuizSingleOptionProps = {
  columns?: 1 | 2;
  emoji?: string;
  id: string;
  label: string;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  onSelect: (optionId: string) => void;
};

export const QuizSingleOption = memo(function QuizSingleOption({
  columns,
  emoji,
  id,
  label,
  selected,
  style,
  onSelect,
}: QuizSingleOptionProps) {
  const handlePress = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <OptionPill
      columns={columns}
      emoji={emoji}
      label={label}
      onPress={handlePress}
      selected={selected}
      style={style}
    />
  );
});
