import { UpdateProfile } from "@/components/pages/settings/UpdateProfile";
import { LogoutBtn } from "@/components/utils/LogoutBtn";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-10 px-4 pt-10">
      <UpdateProfile />
      <LogoutBtn />
    </div>
  );
}
