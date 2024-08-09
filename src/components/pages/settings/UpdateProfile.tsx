"use client";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
} from "@/components/ui/shadcn/form";
import { useAuthUser } from "@/lib/providers/authProvider";
import { DegreeKeys, formSchema } from "@/lib/types";
import { uploadProfileImage } from "@/lib/utils";
import { Degree } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../ui/shadcn/input";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSaving(true);
    let imgPath;
    try {
      console.log("Hello");
      imgPath = await uploadProfileImage(values.profilePic, user.id);
      updateUser({ ...values, profilePic: imgPath! }).then((_) => {
        setSaving(false);
        setEdit(false);
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update user");
    }
  }

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      console.log("Profile Pic: ", user.profilePic);
    }
  };

  return (
    <Form {...form}>
      <form
        id="profile-update-form"
        className="flex flex-col space-y-4 px-1 mt-8 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col space-y-6 items-center">
            {/* <ProfilePicInput
              control={form.control}
              name="profilePicture"
              label="Profile Picture"
              placeholder="Profile Picture"
            /> */}

            {/* <FormField
              control={form.control}
              name="profilePic"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      className=""
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
                  </FormControl>
                  {value && (
                    <div
                      className="relative flex items-end justify-between w-80 h-44 p-3 rounded-full shadow-md shadow-gray-400 bg-sky-500"
                      style={{
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `url(${URL.createObjectURL(value)})`,
                      }}
                    />
                  )}
                </FormItem>
              )}
            ></FormField> */}
            <div className="flex justify-center items-center flex-col">
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormLabel className="cursor-pointer">
                    <div
                      className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300"
                      style={{
                        backgroundImage: `url(${imageSrc || user.profilePic})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <FormControl>
                      <Input
                        {...fieldProps}
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.files && e.target.files[0]);
                          handleImageChange(e);
                        }}
                      />
                    </FormControl>
                  </FormLabel>
                )}
              ></FormField>

              {/* <FormLabel control={form.control} className="cursor-pointer">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300"
                  style={{
                    backgroundImage: `url(${imageSrc || user.profilePic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </FormLabel>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) =>
                  onChange(event.target.files && event.target.files[0])
                }
              /> */}
            </div>
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
