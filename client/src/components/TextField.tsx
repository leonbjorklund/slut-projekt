import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { Field, FieldHookConfig, useField } from "formik";

interface TextFieldProps extends InputProps {
  label: string;
}

export default function TextField({ label, ...props }: TextFieldProps) {
  const fieldConfig: FieldHookConfig<any> = {
    name: props.name as string,
    type: props.type,
  };
  const [field, meta] = useField(fieldConfig);
  return (
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
