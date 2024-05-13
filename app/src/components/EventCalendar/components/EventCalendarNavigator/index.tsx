import { localizedDayJs } from "@/lib/dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { ManipulateType } from "dayjs";
import { NavigateAction } from "react-big-calendar";
import { DatePickerWrapper } from "../../../DatePickerWrapper";
import { EventCalendarButton } from "../EventCalendarButton";
import { PickerType } from "@/lib/datePicker";

type EventCalendarNavigatorProps = {
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
  date: Date;
  picker: PickerType
}

export const EventCalendarNavigator = ({ onNavigate, date, picker }: EventCalendarNavigatorProps) => {

  const adjustDate = (operation: 'add' | 'subtract') => {
    const unitMap: Record<PickerType, string> = {
      'date': 'day',
      'week': 'week',
      'month': 'month',
      "date-time": 'day',
    };
    const unit = unitMap[picker]; 
    return localizedDayJs(date)[operation](1, unit as ManipulateType).toDate();
  };

  const onPrevClick = () => onNavigate('DATE', adjustDate('subtract'));
  const onNextClick = () => onNavigate('DATE', adjustDate('add'));
  const onNavigateDate = (selectedDate: Date) => onNavigate('DATE', selectedDate);

  return (
    <Flex align="center" justify="center" gap={8}>
      <EventCalendarButton onClick={onPrevClick}>
        <LeftOutlined />
      </EventCalendarButton>
      <DatePickerWrapper date={date} onChange={onNavigateDate} picker={picker} />
      <EventCalendarButton onClick={onNextClick}>
        <RightOutlined />
      </EventCalendarButton>
    </Flex>
  );
}