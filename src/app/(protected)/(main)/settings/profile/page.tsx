"use client";

import { EventCard } from "@/components/pages/home/EventCard";
import { UpdateProfile } from "@/components/pages/settings/UpdateProfile";
import { Avatar, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
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
      setSaving(true);
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
      <div className="fixed top-0 right-0 pt-6 pr-6 z-50">
        <Button
          onClick={() => handleEdit()}
          className="rounded-full"
          type="submit"
        >
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
        <div className="flex flex-col gap-y-6 mt-8">
          <div className="flex flex-col items-center justify-center w-full gap-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.profilePic || "users/default.jpg"} />
            </Avatar>

            <div className="flex flex-col items-center">
              <span className="text-2xl leading-snug">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-gray-500 text-sm">@{user.username}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full mt-2 gap-x-4 gap-y-2 text-xs font-light">
              <Badge
                style={{
                  backgroundColor: userMajor?.color,
                }}
              >
                {userMajor?.name}
              </Badge>

              {userMinor?.name && user?.minor !== "NONE" ? (
                <Badge
                  style={{
                    backgroundColor: userMinor?.color,
                  }}
                >
                  {userMinor?.name}
                </Badge>
              ) : null}

              {user.orgs?.map((org) => (
                <Badge
                  key={org.id}
                  style={{
                    backgroundColor: org.color || undefined,
                  }}
                >
                  {org.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            {user.events?.filter((e) => e.startTime < new Date()).length ===
            0 ? (
              <div className="w-full text-center">No events attended yet</div>
            ) : (
              user.events
                ?.filter((e) => e.startTime < new Date())
                .map((event) => (
                  <div key={event.id} className="w-full">
                    <span className="ml-4 text-xs">
                      <span className="font-semibold mr-0.5">
                        @{user.username}
                      </span>
                      <span className="font-light">attended</span>
                    </span>
                    <EventCard small={true} event={event} />
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </SubPageLayout>
  );
}
