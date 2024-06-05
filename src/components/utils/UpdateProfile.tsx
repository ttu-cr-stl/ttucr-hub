"use client";
import { useUser } from "@/lib/hooks/useUser";
import { Degree, DegreeKeys, NavPath } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormRadio } from "./formItems/FormRadio";
import { ProfilePicInput } from "./formItems/ProfilePicInput";
import { FormTextInput } from "./formItems/FormTextInput";

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

export const UpdateProfile = () => {
  const { user, updateUser, userLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

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
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting", values);
    try {
      updateUser(values);
      if (pathname === NavPath.ONBOARDING) {
        router.push(NavPath.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >

        <ProfilePicInput control={form.control} name="profilePic" label="Profile Picture" />

        <div className="flex flex-col space-y-2">
          <FormTextInput control={form.control} name="firstName" label="First Name" placeholder="First Name" />
          <FormTextInput control={form.control} name="lastName" label="Last Name" placeholder="Last Name" />     
        </div>

        <FormTextInput control={form.control} name="r_number" label="R#" placeholder="XXXXXXXX" />
        
        <FormRadio
          label="Major"
          control={form.control}
          name="major"
          placeholder="Choose a major"
          options={Degree}
        />

        <FormRadio
          label="Minor"
          control={form.control}
          name="minor"
          placeholder="Choose a minor"
          options={Degree}
        />

        <Button type="submit">
          {userLoading
            ? "Loading..."
            : pathname === NavPath.ONBOARDING
            ? "Save and Continue"
            : "Save"}
        </Button>
        
      </form>
    </Form>
  );
};
