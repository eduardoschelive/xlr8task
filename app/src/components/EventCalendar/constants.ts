import { Event, EventPropGetter, Messages } from "react-big-calendar";

export const messages: Messages = {
  today: 'Hoje',
  previous: 'Anterior',
  next: 'Próximo',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  agenda: 'Agenda',
  time: 'Hora',
  date: 'Data',
  allDay: 'Dia inteiro',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste intervalo',
  work_week: 'Semana de trabalho',
  showMore: (count) => `+${count} mais`
}

export const eventPropGetter: EventPropGetter<Event> = () => {
  return {
    style: {
      backgroundColor: '#1677ff',
    },
  };
};
