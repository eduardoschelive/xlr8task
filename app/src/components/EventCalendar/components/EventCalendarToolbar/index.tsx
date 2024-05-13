import { PickerType } from '@/lib/date';
import { Col, Row } from 'antd';
import { ToolbarProps, View } from 'react-big-calendar';
import { EventCalendarNavigator } from '../EventCalendarNavigator';
import { EventCalendarViewChanger } from '../EventCalendarViewChanger';
import { EventCalendarFilter } from '../EventCalendarFilter';

const determinePickerType = (view: View): PickerType => {
  switch (view) {
    case 'day':
      return 'date';
    case 'week':
      return 'week';
    default:
      return 'month';
  }
};

export const EventCalendarToolbar = ({ view, onView, onNavigate, date, views }: ToolbarProps) => {
  return (
    <div style={{ marginBottom: 8 }}>
      <Row justify={'space-around'} align={'middle'}>
        <Col span={8} >
          <EventCalendarViewChanger currentView={view} onView={onView} allowedViews={views as Array<View>} />
        </Col>
        <Col span={8}>
          <EventCalendarNavigator onNavigate={onNavigate} date={date} picker={determinePickerType(view)} />
        </Col>
        <Col span={8} >
          <EventCalendarFilter onNavigate={onNavigate}/>
        </Col>
      </Row>
    </div>
  );
};