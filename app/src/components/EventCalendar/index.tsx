import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './styles.css';

import { useTasks } from "@/context/TaskContext";
import { useHolidaysQuery } from "@/hooks/useHolidaysQuery";
import { dateLocalizer } from "@/lib/dateLocalizer";
import { Task } from "@/model/taskModel";
import { useState } from "react";
import { Calendar, Components, View, Views } from "react-big-calendar";
import { EventCalendarDateHeader } from "./components/EventCalendarDateHeader";
import { EventCalendarToolbar } from "./components/EventCalendarToolbar";
import { EventComponent } from "./components/EventComponent";
import { eventPropGetter, messages } from "./constants";

export function EventCalendar() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const { getHoliday, isLoading } = useHolidaysQuery(date.getFullYear())

  const { filteredTasks } = useTasks();

  const components: Components<Task> = {
    toolbar: EventCalendarToolbar,
    month: {
      dateHeader: (props) => <EventCalendarDateHeader  {...props} holiday={getHoliday(props.date)} isLoading={isLoading} />,
    },
    event: EventComponent,
  };

  return (
    <Calendar
      localizer={dateLocalizer}
      events={filteredTasks || []}
      components={components}
      defaultDate={new Date()}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      view={view}
      onView={(view) => setView(view)}
      date={date}
      titleAccessor={(task: Task) => task.title}
      startAccessor={(task: Task) => new Date(task.startDate)}
      endAccessor={(task: Task) => new Date(task.endDate)}
      onNavigate={(date) => setDate(date)}
      messages={messages}
      culture="pt-BR"
      eventPropGetter={eventPropGetter}
    />
  );
}