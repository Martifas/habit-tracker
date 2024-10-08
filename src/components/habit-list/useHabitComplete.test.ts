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
  it('should change habit color to light green when completed', () => {
    expect(getHabitBackgroundColor(isCompleted)).toBe('#d1e6d4');
  });
  it('should change to undo icon when completed', () => {
    expect(getCompleteButtonIcon(isCompleted)).toBe(UndoIcon);
  });
  it('should change habit state text to completed when completed', () => {
    expect(getCompleteStateText(isCompleted)).toBe('Completed');
  });
  it('should change button label when completed', () => {
    expect(getCompleteButtonLabel(isCompleted)).toBe('Mark as not completed');
  });
});

describe('changes when not completed', () => {
  const isCompleted = false;
  it('should change habit color to light brown when NOT completed', () => {
    expect(getHabitBackgroundColor(isCompleted)).toBe('#e2e6d1');
  });
  it('should change to complete icon when NOT completed', () => {
    expect(getCompleteButtonIcon(isCompleted)).toBe(CompleteIcon);
  });
  it('should change habit state text to Not completed when NOT completed', () => {
    expect(getCompleteStateText(isCompleted)).toBe('Not Completed');
  });
  it('should change button label when NOT completed', () => {
    expect(getCompleteButtonLabel(isCompleted)).toBe('Mark as completed');
  });
});
