import { LogoutBtn } from "@/components/utils/LogoutBtn";
import { UpdateProfile } from "@/components/utils/UpdateProfile";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-10 px-4 pt-10">
      <UpdateProfile />
      <LogoutBtn />
    </div>
  );
}
