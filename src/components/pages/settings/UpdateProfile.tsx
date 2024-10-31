"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useAuthUser } from "@/lib/providers/authProvider";
import { DegreeKeys, formSchema, ProfileFormValues } from "@/lib/types";
import { ExtendedUser } from "@/lib/types/prismaTypes";
import { uploadProfileImage } from "@/lib/utils";
import { Degree } from "@/lib/utils/consts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { Plus } from "react-feather";
import { useForm, UseFormReturn } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "../../ui/input";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";

export const UpdateProfile = ({
  user,
  setSaving,
  setEdit,
}: {
  user: ExtendedUser;
  setSaving: (saving: boolean) => void;
  setEdit: (edit: boolean) => void;
}) => {
  const { updateUser } = useAuthUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      major: user.major as DegreeKeys,
      minor: user.minor as DegreeKeys,
    },
  }) as UseFormReturn<ProfileFormValues>;

  async function onSubmit(values: ProfileFormValues) {
    setSaving(true);
    let imgPath = user.profilePic;
    try {
      if (values.profilePic) {
        imgPath = await uploadProfileImage(values.profilePic, user.username);
        imgPath = `${imgPath}?t=${new Date().getTime()}`;
      }
      updateUser({ ...values, profilePic: imgPath! })
        .then((_) => {
          setSaving(false);
          setEdit(false);
        })
        .catch((e) => {
          console.error(e);
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
            <div className="flex justify-center items-center flex-col">
              <FormField
                control={form.control}
                name="profilePic"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel className="cursor-pointer relative">
                      <Avatar className="size-24">
                        <AvatarImage src={imageSrc || user.profilePic || ""} />
                        <AvatarFallback className="bg-[#D9D9D9]"></AvatarFallback>
                      </Avatar>
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-xl text-white text-center flex items-center justify-center relative bottom-6 right-0 left-20">
                        <Plus className="w-4 h-4" />
                      </div>
                    </FormLabel>
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
                  </FormItem>
                )}
              />
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
