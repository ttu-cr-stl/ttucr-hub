"use client";
import { Form } from "@/components/ui/shadcn/form";
import { useAuthUser } from "@/lib/providers/authProvider";
import { DegreeKeys, formSchema } from "@/lib/types";
import { Degree } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";
import { ProfilePicInput } from "../../utils/formItems/ProfilePicInput";

export const UpdateProfile = ({
  user,
  setSaving,
  setEdit,
}: {
  user: User;
  setSaving: (saving: boolean) => void;
  setEdit: (edit: boolean) => void;
}) => {
  const { updateUser } = useAuthUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      profilePic: user.profilePic || "",
      major: user.major as DegreeKeys,
      minor: user.minor as DegreeKeys,
    },
  }) as UseFormReturn<z.infer<typeof formSchema>>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSaving(true);
      updateUser(values).then(_ => {
        setSaving(false);
        setEdit(false);
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user");
    }
  }

  return (
    <Form {...form}>
      <form
        id="profile-update-form"
        className="flex flex-col space-y-4 px-1 mt-8 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col space-y-6 items-center">
            <ProfilePicInput
              control={form.control}
              name="profilePicture"
              label="Profile Picture"
              placeholder="Profile Picture"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <FormTextInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <FormTextInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </div>
        {/* Space between elements and horizontal divider line */}
        <div className="space-y-1" />
        <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-700" />
        <FormRadio
          label="Major"
          control={form.control}
          name="major"
          placeholder="Choose a major"
          options={Degree}
        />
        <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-700" />{" "}
        {/* Another horizontal divide line */}
        <FormRadio
          label="Minor"
          control={form.control}
          name="minor"
          placeholder="Choose a minor"
          options={Degree}
        />
      </form>
    </Form>
  );
};
