"use client";
import { Form } from "@/components/ui/form";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { Degree } from "@/lib/utils/consts";
import { Button } from "../../ui/button";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";
import { ProfilePicInput } from "../../utils/formItems/ProfilePicInput";

export const UpdateProfile = () => {
  const { profileForm, onSubmit, formLoading } = useFormProfile();

  return (
    <Form {...profileForm}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={profileForm.handleSubmit(onSubmit)}
      >
        <ProfilePicInput
          control={profileForm.control}
          name="profilePic"
          label="Profile Picture"
        />

        <div className="flex flex-col space-y-2">
          <FormTextInput
            control={profileForm.control}
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <FormTextInput
            control={profileForm.control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </div>

        <FormTextInput
          control={profileForm.control}
          name="r_number"
          label="R#"
          placeholder="XXXXXXXX"
        />

        <FormRadio
          label="Major"
          control={profileForm.control}
          name="major"
          placeholder="Choose a major"
          options={Degree}
        />

        <FormRadio
          label="Minor"
          control={profileForm.control}
          name="minor"
          placeholder="Choose a minor"
          options={Degree}
        />

        <Button type="submit">{formLoading ? "Loading..." : "Save"}</Button>
      </form>
    </Form>
  );
};
