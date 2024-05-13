import { View } from "react-big-calendar";

export type PickerType = 'week' | 'month' | 'date' | 'date-time';

export const getPickerFormat = (picker: PickerType): [string, PickerType] => {
  switch (picker) {
    case 'date':
      return ['DD MMMM YYYY', 'date'];
    case 'week':
      return ['WW YYYY', 'week'];
    case 'date-time':
      return ['DD MMMM YYYY HH:mm', 'date'];
    default: // Covers 'month' and any other cases
      return ['MMMM YYYY', 'month'];
  }
}


export const determinePickerType = (view: View): PickerType => {
  switch (view) {
    case 'day':
      return 'date';
    case 'week':
      return 'week';
    default:
      return 'month';
  }
};