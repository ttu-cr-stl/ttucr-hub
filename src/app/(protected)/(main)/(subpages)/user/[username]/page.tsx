import { getUserByUsername } from "@/db/users";

export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) return <div>User not found</div>;

  return (
    <div className="">
      <span>{user.firstName}</span>
    </div>
  );
}
