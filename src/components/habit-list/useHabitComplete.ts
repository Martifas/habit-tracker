import UndoIcon from '../../assets/icons/undo.svg';
import CompleteIcon from '../../assets/icons/completeIcon';

export default function useHabitComplete() {
  const getCompleteButtonIcon = (isCompleted: boolean) =>
    isCompleted ? UndoIcon : CompleteIcon;

  const getHabitBackgroundColor = (isCompleted: boolean) =>
    isCompleted ? '#d1e6d4' : '#e2e6d1';

  const getCompleteStateText = (isCompleted: boolean) =>
    isCompleted ? 'Completed' : 'Not Completed';

  const getCompleteButtonLabel = (isCompleted: boolean) =>
    isCompleted ? 'Mark as not completed' : 'Mark as completed';

  return {
    getCompleteButtonIcon,
    getHabitBackgroundColor,
    getCompleteStateText,
    getCompleteButtonLabel,
  };
}
