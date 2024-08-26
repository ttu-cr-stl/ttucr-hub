import { getUserByUsername } from "@/db/users";
import UserProfileDisplay from "@/components/pages/(subpages)/user/UserProfileDisplay";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) return <div>User not found</div>;

  return <UserProfileDisplay user={user} showStucoTitle={true} />;
}