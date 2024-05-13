import { convertToDayjs } from '@/lib/dayjs';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

import { PickerType, getPickerFormat } from '@/lib/datePicker';
import locale from 'antd/es/date-picker/locale/pt_BR';

type EventCalendarDatePickerProps = {
  date: Date;
  onChange: (date: Date) => void;
  picker: PickerType
}

export const DatePickerWrapper = ({ date, onChange, picker }: EventCalendarDatePickerProps) => {
  const currentValue = convertToDayjs(date);

  const [format, pickerType] = getPickerFormat(picker);
  const showTime = picker === 'date-time';

  const onChangeDate = (date: Dayjs | null) => {
    if (date) {
      onChange(date.toDate());
    }
  }

  return (
    <DatePicker
      locale={locale}
      value={currentValue}
      onChange={onChangeDate}
      allowClear={false}
      format={format}
      size="middle"
      // @ts-expect-error - A propriedade picker não é reconhecida pelo componente DatePicker
      picker={pickerType}
      showTime={showTime}
    />
  );
};