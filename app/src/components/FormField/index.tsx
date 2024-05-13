import { Flex, Form, Typography } from "antd";
import { Control, Controller, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: string;
  label: string;
  required?: boolean;
  children: (props: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any> | undefined;
}

export const FormField = ({ name, label, control, required = false, children }: FormFieldProps) => {
  return (
    <Form.Item name={name} label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Flex vertical>
            {children(field)}
            <Typography.Text type="danger">{fieldState.error?.message}</Typography.Text>
          </Flex>
        )}
      />
    </Form.Item>
  )
}