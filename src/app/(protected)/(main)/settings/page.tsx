import { Button } from "@/components/ui/shadcn/button";
import { LogoutBtn } from "@/components/utils/LogoutBtn";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex flex-col justify-center h-screen space-y-10 px-4 pt-10">
      <h1 className="absolute m-12 top-0 left-0 m-2 text-4xl font-bold">Settings</h1>
      <img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F56cbd60d-6df7-4b4d-aceb-1530b41c7b06%2F3159332d-35bb-4fcd-a428-cc5783932e5c%2FSTL_-_TTUCR_(1).png?table=block&id=10e04333-a986-4b91-9e61-06bf7cfe2ae5&spaceId=56cbd60d-6df7-4b4d-aceb-1530b41c7b06&width=2000&userId=d4611e35-059f-4eb5-9d85-0bcb6d0720ba&cache=v2" alt="Settings Banner" className="absolute top-0 left-0 w-full h-1/4 object-cover"></img>
      <div className="flex flex-col items-center justify-center space-y-2 px-4 pt-10"></div>
      <Link href="/settings/profile">
        <Button className="w-full max-w-md">Edit Profile</Button>
      </Link>
      <LogoutBtn/>
    </div>
  );
}
