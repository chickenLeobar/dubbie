import {
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";

type FieldFormProps = {
  name: string;
  label?: string;
} & InputProps;

export const FieldForm = ({ name, label, ...args }: FieldFormProps) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl isInvalid={!!(meta.error && meta.touched)}>
      <Input {...args} {...field} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
