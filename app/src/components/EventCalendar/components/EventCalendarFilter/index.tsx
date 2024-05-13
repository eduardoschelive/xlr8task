import { useTags } from "@/context/TagContext";
import { useTasks } from "@/context/TaskContext";
import { AutoComplete, Flex, Input, Select } from "antd";
import { useMemo, useState } from "react";
import { NavigateAction } from "react-big-calendar";

type EventCalendarFilterProps = {
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
};

export const EventCalendarFilter = ({ onNavigate }: EventCalendarFilterProps) => {
  const { setFilterTags, filteredTasks } = useTasks();
  const { tags } = useTags();
  const [value, setValue] = useState<string>('');

  const options = useMemo(() => filteredTasks?.map(task => ({
    label: task.title,
    value: task.uuid,
  })), [filteredTasks]);

  const tagOptions = useMemo(() => tags?.map(tag => ({
    label: tag.name,
    value: tag.uuid,
  })), [tags]);


  const resetValue = () => setValue('');

  const navigateToTask = (taskUUID: string) => {
    const task = filteredTasks?.find(task => task.uuid === taskUUID);
    if (task) {
      setValue(task.title);
      onNavigate('DATE', task.startDate);
    } else {
      resetValue();
    }
  };

  return (
    <Flex gap={4} justify="end">
      <Select
        mode="multiple"
        placeholder="Filtrar por tags"
        allowClear
        options={tagOptions}
        maxTagPlaceholder="..."
        maxTagCount={2}
        maxTagTextLength={10}
        style={{ width: '50%' }}
        onChange={(tags: string[]) => setFilterTags(tags)}
      />
      <AutoComplete
        options={options}
        onSelect={navigateToTask}
        filterOption={true}
        optionFilterProp="label"
        value={value}
        onSearch={setValue}
        onFocus={resetValue}
        notFoundContent="Nenhum evento encontrado com os filtros"
      >
        <Input.Search placeholder="Busca por título" allowClear enterButton />
      </AutoComplete>
    </Flex>
  );
}