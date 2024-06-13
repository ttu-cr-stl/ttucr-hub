"use client";
import { Form } from "@/components/ui/shadcn/form";
import { Spinner } from "@/components/utils/Spinner";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { Degree } from "@/lib/utils/consts";
import { useState } from "react";
import { Button } from "../../ui/shadcn/button";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";
import { ProfilePicInput } from "../../utils/formItems/ProfilePicInput";

export const UpdateProfile = () => {
  const { profileForm, onSubmit } = useFormProfile();
  const [loading, setLoading] = useState(false);

  return (
    <Form {...profileForm}> 
      <form
        id="profileForm"
        className="flex flex-col space-y-4 px-1"
        onSubmit={profileForm.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-4"> 
          <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl" for=":r0:-form-item">Profile</label>
          <div className="flex flex-col space-y-6 items-center">
            <ProfilePicInput
              control={profileForm.control}
              name="profilePicture"
              label="Profile Picture"
              placeholder="Profile Picture"
            />
          </div>
        </div>

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

        <div className="flex items-center space-x-3">
          <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl" for="r_number">R#</label>
        <FormTextInput
          control={profileForm.control}
          name="r_number"
          placeholder="XXXXXXXX"
          extraProps={{
            maxlength: 8,
            type: "text",
            inputmode: "numeric",
            pattern: "[0-9]*",
          }}
        />

        <FormRadio
          label="Major"
          control={profileForm.control}
          name="major"
          placeholder="Choose a major"
          options={Degree}
        />

        <hr className="h-px my-8 bg-gray-200 border-1 dark:bg-gray-700"/> {/* This is just the little horizontal divide line */}

        <FormRadio
          label="Minor"
          control={profileForm.control}
          name="minor"
          placeholder="Choose a minor"
          options={Degree}
        />

        <Button
          type="button"
          onClick={() => {
            setLoading(true);
            const form = document.getElementById(
              "profileForm"
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
