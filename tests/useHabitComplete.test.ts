import { describe, expect, it } from 'vitest';
import UndoIcon from '../src/assets/icons/undo.svg';
import useHabitComplete from '../src/components/habit-list/useHabitComplete';

const {
  getCompleteButtonIcon,
  getHabitBackgroundColor,
  getCompleteStateText,
  getCompleteButtonLabel,
} = useHabitComplete();

describe('is completion button working', () => {
  it('this is just a test', () => {
    const isCompleted = true;

    expect(getCompleteButtonIcon(isCompleted)).toBe(UndoIcon);
  });
});
