import { Button, Flex } from "antd";
import { View } from 'react-big-calendar';

const viewsDictionary: Record<View, string> = {
  day: 'Dia',
  week: 'Semana',
  month: 'Mês',
  agenda: 'Agenda',
  work_week: 'Semana de trabalho'
};

type AllowedViews = Array<View>;

interface EventCalendarViewChangerProps {
  currentView: View;
  onView: (view: View) => void;
  allowedViews: AllowedViews;
}

export const EventCalendarViewChanger = ({ onView, currentView, allowedViews }: EventCalendarViewChangerProps) => {
  const handleViewChange = (view: View) => {
    onView(view);
  };

  const isCurrentView = (view: View) => view === currentView;

  return (
    <Flex gap={16}>
      {allowedViews.map(view => (
        <Button key={view} onClick={() => handleViewChange(view)} type={isCurrentView(view) ? 'primary' : 'dashed'} aria-pressed={isCurrentView(view) ? true : false}>
          {viewsDictionary[view]}
        </Button>
      ))}
    </Flex>
  );
};
