import { Button } from 'antd';
import { PropsWithChildren } from 'react';

type EventCalendarButtonProps = {
  onClick: () => void;
}

export const EventCalendarButton = ({ onClick, children }: PropsWithChildren<EventCalendarButtonProps>) => {
  return (
    <Button
      onClick={onClick}
      size="middle"
    >
      {children}
    </Button>
  );
}