"use client";
import { Form } from "@/components/ui/shadcn/form";
import { Spinner } from "@/components/utils/Spinner";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { Degree } from "@/lib/utils/consts";
import { useState } from "react";
import { Button } from "../../ui/shadcn/button";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";
import { Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/shadcn/avatar";

export const UpdateProfile = () => {
  const { profileForm, onSubmit } = useFormProfile();
  const [loading, setLoading] = useState(false);

  return (
    <Form {...profileForm}>
        {/* Avatar element outside of the UpdateProfile form */}
        <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xl" for=":r0:-form-item">Profile Picture</label>
        
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback> PFP </AvatarFallback>
          </Avatar>

      <form
        id="profileForm"
        className="flex flex-col space-y-4 px-1"
        onSubmit={profileForm.handleSubmit(onSubmit)}
      >
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
