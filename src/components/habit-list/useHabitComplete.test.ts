import { describe, expect, it } from 'vitest';
import UndoIcon from '../../assets/icons/undo.svg';
import CompleteIcon from '../../assets/icons/complete.svg';
import useHabitComplete from './useHabitComplete';

const {
  getCompleteButtonIcon,
  getHabitBackgroundColor,
  getCompleteStateText,
  getCompleteButtonLabel,
} = useHabitComplete();

describe('changes when completed', () => {
  const isCompleted = true;
  it('changes habit color to light green when completed', () => {
    expect(getHabitBackgroundColor(isCompleted)).toBe('#d1e6d4');
  });
  it('changes to undo icon when completed', () => {
    expect(getCompleteButtonIcon(isCompleted)).toBe(UndoIcon);
  });
  it('changes habit state text to completed when completed', () => {
    expect(getCompleteStateText(isCompleted)).toBe('Completed');
  });
  it('changes button label when completed', () => {
    expect(getCompleteButtonLabel(isCompleted)).toBe('Mark as not completed');
  });
});

describe('changes when not completed', () => {
  const isCompleted = false;
  it('changes habit color to light brown when NOT completed', () => {
    expect(getHabitBackgroundColor(isCompleted)).toBe('#e2e6d1');
  });
  it('changes to complete icon when NOT completed', () => {
    expect(getCompleteButtonIcon(isCompleted)).toBe(CompleteIcon);
  });
  it('changes habit state text to Not completed when NOT completed', () => {
    expect(getCompleteStateText(isCompleted)).toBe('Not Completed');
  });
  it('changes button label when NOT completed', () => {
    expect(getCompleteButtonLabel(isCompleted)).toBe('Mark as completed');
  });
});
