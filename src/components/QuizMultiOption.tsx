import React, { memo, useCallback } from 'react';
import { OptionPill } from './OptionPill';

type QuizMultiOptionProps = {
  columns?: 1 | 2;
  emoji?: string;
  id: string;
  label: string;
  selected: boolean;
  onToggle: (optionId: string) => void;
};

export const QuizMultiOption = memo(function QuizMultiOption({
  columns,
  emoji,
  id,
  label,
  selected,
  onToggle,
}: QuizMultiOptionProps) {
  const handlePress = useCallback(() => onToggle(id), [id, onToggle]);

  return (
    <OptionPill
      columns={columns}
      emoji={emoji}
      label={label}
      onPress={handlePress}
      selected={selected}
    />
  );
});
