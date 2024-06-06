"use client";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/utils/Spinner";
import { useFormProfile } from "@/lib/hooks/useFormProfile";
import { Degree } from "@/lib/utils/consts";
import { useState } from "react";
import { useInterval, useTimeout } from "usehooks-ts";
import { Button } from "../../ui/button";
import { FormRadio } from "../../utils/formItems/FormRadio";
import { FormTextInput } from "../../utils/formItems/FormTextInput";

export const UpdateProfile = () => {
  const { profileForm, onSubmit } = useFormProfile();
  const [loading, setLoading] = useState(false);

  return (
    <Form {...profileForm}>
      <form
        id="profileForm"
        className="flex flex-col space-y-6"
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

        <CarouselItem>
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
        </CarouselItem>

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
