import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { DegreeKeys } from "../utils/consts";
import { useUser } from "./useUser";

const formSchema = z.object({
  firstName: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "Name is required",
  }),
  r_number: z
    .string({
      required_error: "R number is required",
    })
    .length(8, {
      message: "R number must be 8 characters long",
    }),
  profilePic: z.string(), //.url()
  major: z.nativeEnum(DegreeKeys),
  minor: z.nativeEnum(DegreeKeys),
});

export const useFormProfile = () => {
  const { user, updateUser, userLoading } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      r_number: user?.r_number,
      profilePic: user?.profilePic || "",
      major: user?.major as DegreeKeys,
      minor: user?.minor as DegreeKeys,
    },
  }) as UseFormReturn<z.infer<typeof formSchema>>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      updateUser(values);
    } catch (error) {
      console.error(error);
    }
  }

  return { profileForm: form, onSubmit, formLoading: userLoading };
};
