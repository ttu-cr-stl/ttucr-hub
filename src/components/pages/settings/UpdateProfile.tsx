"use client";
import { Form } from "@/components/ui/shadcn/form";
import { Spinner } from "@/components/utils/Spinner";
import { Degree } from "@/lib/utils/consts";
import { useState } from "react";
import { Button } from "../../ui/shadcn/button";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";
import { ProfilePicInput } from "../../utils/formItems/ProfilePicInput";
import { internalUpdateUserByUsername } from "@/db/users";
import { useAuthUser } from "@/lib/hooks/useAuthUser";
import { formSchema, DegreeKeys } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const UpdateProfile = () => {
  //Form stuff
  const user = useAuthUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profilePic: user?.profilePic || "",
      major: user?.major as DegreeKeys,
      minor: user?.minor as DegreeKeys,
    },
  }) as UseFormReturn<z.infer<typeof formSchema>>;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user)
      try {
        internalUpdateUserByUsername(user?.username, values);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
  }
  const [loading, setLoading] = useState(false);

  return (
    <Form {...form}>
      <form
        id="form"
        className="flex flex-col space-y-4 px-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-4">
          <label
            className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl"
            htmlFor=":r0:-form-item"
          >
            Profile
          </label>
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
        <Button
          type="button"
          onClick={() => {
            setLoading(true);
            const form = document.getElementById(
              "form"
            ) as HTMLFormElement;
            if (form) {
              try {
                form.requestSubmit();
                setTimeout(() => setLoading(false), 1000);
              } catch (e) {
                console.log(e);
                setLoading(false);
              }
            }
          }}
        >
          {loading ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};
