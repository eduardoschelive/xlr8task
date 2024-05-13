import { DatePickerWrapper } from '@/components/DatePickerWrapper';
import { useTags } from '@/context/TagContext';
import { Task, taskSchema } from '@/model/taskModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../FormField';
import { TaskEditModalActions } from '../TaskEditModalActions';

type TaskEditScreenProps = {
  onSave(task: Task): void;
  onRemove?(): void;
  task?: Task;
  children?: React.ReactNode;
};

export const TaskEditModal = ({ onSave, task, onRemove, children }: TaskEditScreenProps) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { tags } = useTags();

  const { control, handleSubmit, reset } = useForm<Task>({
    defaultValues: task,
    resolver: zodResolver(taskSchema),
  });

  const showModal = () => {
    setIsModalVisible(true);
  }

  const hideModal = () => {
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    reset();
    hideModal();
  }

  const handleSave = (data: Task) => {
    onSave(data)
    hideModal();
  }

  const selectOptions = tags?.map(tag => ({ label: tag.name, value: tag.uuid })) || []

  return (
    <>
      <Modal
        title="Editar tarefa"
        onCancel={handleCancel}
        open={isModalVisible}
        footer={null}
      >
        <Form
          name="task-edit-form"
          initialValues={task}
          layout="vertical"
          onFinish={handleSubmit(handleSave)}
        >
          <FormField name="title" label="Título" required control={control}>
            {(field) => <Input onChange={field.onChange} value={field.value} />}
          </FormField>
          <FormField name="description" label="Descrição" required control={control}>
            {(field) => <Input.TextArea onChange={field.onChange} value={field.value} />}
          </FormField>
          <FormField name="startDate" label="Data inicial" required control={control}>
            {(field) => <DatePickerWrapper onChange={field.onChange} date={field.value} picker="date-time" />}
          </FormField>
          <FormField name="endDate" label="Data final" required control={control}>
            {(field) => <DatePickerWrapper onChange={field.onChange} date={field.value} picker="date-time" />}
          </FormField>
          <FormField name="tags" label="Tags" control={control}>
            {(field) => <Select mode="tags" onChange={field.onChange} value={field.value} options={selectOptions} allowClear />}
          </FormField>
          <TaskEditModalActions onCancel={handleCancel} handleRemove={onRemove} />
        </Form>
      </Modal>
      <span onClick={showModal}>
        {children}
      </span>
    </>
  )
}