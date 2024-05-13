import { TaskEditModal } from "@/components/TaskEditModal"
import { useTags } from "@/context/TagContext"
import { useTasks } from "@/context/TaskContext"
import { dateToString } from "@/lib/dayjs"
import { Task } from "@/model/taskModel"
import { Flex, Popover, Tag, Typography } from "antd"
import { EventProps } from "react-big-calendar"

type EventComponentProps = EventProps<Task>

export const EventComponent = ({ title, event }: EventComponentProps) => {

  const { tags } = useTags()
  const { editTask, removeTask } = useTasks()

  const getEventTags = (eventTags: string[] | undefined) => {
    if (!tags || !eventTags) return []
    return tags.filter(tag => eventTags.includes(tag.uuid!))
  }

  const popoverContent = (
    <Flex vertical gap={4}>
      <Typography.Text>{title}</Typography.Text>
      <Typography.Paragraph>{event.description}</Typography.Paragraph>
      <Flex>
        {getEventTags(event.tags).map(tag => (
          <Tag key={tag.uuid} color={tag.color}>{tag.name}</Tag>
        ))}
      </Flex>
      <Typography.Text>{`${dateToString(event.startDate)} até ${dateToString(event.endDate)}`}</Typography.Text>
    </Flex>
  )

  return (
    <TaskEditModal onSave={editTask} onRemove={() => removeTask(event.uuid!)} task={event}>
      <Popover content={popoverContent}>
        <div>{title}</div>
      </Popover>
    </TaskEditModal>
  )
}