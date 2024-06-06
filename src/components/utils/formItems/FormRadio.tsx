import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { FormComponentProps } from "@/lib/utils/consts";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { FC } from "react";

export const FormRadio: FC<FormComponentProps> = ({
  control,
  name,
  placeholder,
  options = [],
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-xl">{label}</FormLabel>

          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-2"
            >
              {options.map((option, index) => (
                <FormItem key={index} className="">
                  <FormControl>
                    <RadioGroupItem value={option.value}>
                      <div
                        className={`px-2 pt-0.5 pb-1 mb-2 rounded-full border`}
                        style={{
                          borderColor: option.color,
                          backgroundColor:
                            option.value === field.value
                              ? option.color
                              : "transparent",
                          color:
                            option.value === field.value
                              ? "white"
                              : option.color,
                        }}
                      >
                        <span className="text-base">{option.name}</span>
                      </div>
                    </RadioGroupItem>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
