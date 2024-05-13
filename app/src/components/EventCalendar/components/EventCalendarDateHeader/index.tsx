import { Holiday } from "@/model/holidayModel";
import { Flex, Tag } from "antd";
import { DateHeaderProps } from "react-big-calendar";

type EventCalendarDateHeaderProps = {
  holiday?: Holiday
  isLoading: boolean
} & DateHeaderProps;

export const EventCalendarDateHeader = ({ label, onDrillDown, holiday, isLoading }: EventCalendarDateHeaderProps) => {

  const renderHoliday = () => {
    if (isLoading) {
      return (
        <Tag color="blue" style={{ margin: '4px' }} >
          Carregando...
        </Tag>
      )
    } else
    if (holiday) {
      return (
        <Tag color="red" onClick={onDrillDown} style={{ margin: '4px' }} >
          {holiday.localName}
        </Tag>
      )
    }
    return null
  }

  return (
    <Flex justify="flex-end" align="center" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        {renderHoliday()}
        <span onClick={onDrillDown}>
          {label}
        </span>
      </Flex>
    </Flex>
  );
}