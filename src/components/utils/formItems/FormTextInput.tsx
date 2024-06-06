import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormComponentProps } from "@/lib/utils/consts";
import { FC } from "react";

export const FormTextInput: FC<FormComponentProps> = ({
  control,
  name,
  label,
  placeholder,
  extraProps,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xl">{label}</FormLabel>
          <FormControl>
            <Input
              className="text-xl"
              {...extraProps}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
