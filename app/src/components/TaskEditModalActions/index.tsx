import { Button, Flex } from "antd";

type TaskEditModalActionsProps = {
  onCancel: () => void;
  handleRemove?: () => void;
};

export const TaskEditModalActions = ({ onCancel, handleRemove }: TaskEditModalActionsProps) => {

  const onClickRemove = () => {
    if (handleRemove) {
      handleRemove();
      onCancel();
    }
  }

  return (
    <Flex align="end" justify="end" gap={8}>
      <Button key="cancel" onClick={onCancel}>
        Cancelar
      </Button>
      {handleRemove && (
        <Button key="remove" danger onClick={onClickRemove}>
          Remover
        </Button>
      )}
      <Button key="submit" type="primary" htmlType="submit">
        Salvar
      </Button>
    </Flex>
  )
}