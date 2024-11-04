import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { FC } from "react";

interface FormComponentProps {
  control: any;
  name: string;
  options?: { name: string; value: string; color: string }[];
  label: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
}

export const FormRadio: FC<FormComponentProps> = ({
  control,
  name,
  options = [],
  label,
  onKeyDown,
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
              onKeyDown={onKeyDown}
            >
              {options.map((option, index) => (
                <FormItem key={index} className="">
                  <FormControl>
                    <RadioGroupItem value={option.value}>
                      <div
                        className={`px-2 pt-0.5 pb-1 mb-2 rounded-full border bg-white`}
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
