import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { FormComponentProps } from "@/lib/types";
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
