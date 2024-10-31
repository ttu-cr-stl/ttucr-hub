"use client";

import UserProfileDisplay from "@/components/pages/(subpages)/user/UserProfileDisplay";
import { UpdateProfile } from "@/components/pages/settings/UpdateProfile";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/providers/authProvider";
import { Degree } from "@/lib/utils/consts";
import { useState } from "react";
import { Loader } from "react-feather";
import SubPageLayout from "../../(subpages)/layout";

export default function Profile() {
  const { user } = useAuthUser();
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const userMajor = Degree.find((degree) => degree.value === user?.major);
  const userMinor = Degree.find((degree) => degree.value === user?.minor);

  const handleEdit = () => {
    if (edit) {
      const form = document.getElementById(
        "profile-update-form"
      ) as HTMLFormElement;
      if (form) {
        try {
          form.requestSubmit();
        } catch (e) {
          console.log(e);
          setSaving(false);
          setEdit(false);
        }
      }
    } else {
      setEdit(true);
    }
  };

  return (
    <SubPageLayout>
      <div className="sticky top-4 right-0 w-fit h-12 ml-auto z-50">
        <Button onClick={() => handleEdit()} className="w-[65px] rounded-full">
          {edit ? (
            saving ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Save"
            )
          ) : (
            "Edit"
          )}
        </Button>
      </div>
      {edit ? (
        <UpdateProfile user={user} setSaving={setSaving} setEdit={setEdit} />
      ) : (
        <UserProfileDisplay user={user} showStucoTitle={true} />
      )}
    </SubPageLayout>
  );
}
