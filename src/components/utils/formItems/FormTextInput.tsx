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

export const FormTextInput: FC<FormComponentProps & { onKeyDown?: (e: React.KeyboardEvent) => void }> = ({
  control,
  name,
  label,
  placeholder,
  onKeyDown,
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
              {...field}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};