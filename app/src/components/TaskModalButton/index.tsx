import { useTasks } from "@/context/TaskContext"
import { FileAddOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { TaskEditModal } from "../TaskEditModal"

export const TaskModalButton = () => {

  const { addTask } = useTasks()

  return (
    <TaskEditModal onSave={addTask}>
      <FloatButton icon={<FileAddOutlined />} tooltip="Criar nova tarefa" />
    </TaskEditModal>
  )

}