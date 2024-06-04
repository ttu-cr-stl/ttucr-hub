import { Button } from "@/components/ui/button";
import { LogoutBtn } from "@/components/utils/LogoutBtn";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-10 px-4 pt-10">
      <LogoutBtn />

      <Button>Add your email</Button>
    </div>
  );
}
