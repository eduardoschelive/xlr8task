import { Tag, tagSchema } from "@/model/tagModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorPicker, Form, Input, Modal } from "antd";
import { Color } from "antd/lib/color-picker";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";

type TagEditModalProps = {
  onSave: (tag: Tag) => void;
  tag?: Tag;
  title: string;
  formName: string;
};

export const TagEditModal = ({ onSave, tag, title, formName, children }: PropsWithChildren<TagEditModalProps>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { control, handleSubmit, reset } = useForm<Tag>({
    values: tag,
    resolver: zodResolver(tagSchema),
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
  };

  const handleSave = (data: Tag) => {
    onSave(data);
    hideModal();
    reset();
  };

  const onFinished = handleSubmit((data) => handleSave(data))

  return (
    <>
      <Form
        name={formName}
        layout="vertical"
        onFinish={onFinished}
        initialValues={tag}
      >
        <Modal open={isModalVisible} onCancel={handleCancel} title={title} onOk={onFinished}>
          <FormField name="name" label="Nome" control={control} required>
            {(field) => <Input onChange={field.onChange} value={field.value} />}
          </FormField>
          <FormField name="color" label="Cor" control={control} required>
            {(field) => (
              <ColorPicker
                defaultValue={field.value}
                onChange={(value: Color) => field.onChange(value.toHexString())}
                showText={(color) => <span>({color.toHexString()})</span>}
              />
            )}
          </FormField>
        </Modal>
      </Form>
      <span onClick={showModal}>
        {children}
      </span>
    </>
  );
};