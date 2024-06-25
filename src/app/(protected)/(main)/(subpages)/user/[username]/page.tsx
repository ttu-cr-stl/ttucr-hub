/* import { getUserByUsername } from "@/db/users";
import { DegreeKeys, SelectOption } from "@/lib/types";
import { getDegreeByKey } from "@/lib/utils";
export default async function User({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) return <div>User not found</div>;

  const degree = getDegreeByKey(user.major as DegreeKeys)

  return (
    <div className="w-auto h-auto bg-[#ececec] rounded-lg text-center p-3 inline-grid justify-center">
      <h2>{user.firstName} {user.lastName}</h2>
      <h4><span className="text-[#cc0000]">R-Number:</span> {user.r_number}</h4>
      <div className="w-fit px-2 pt-0.5 pb-1 mt-2 rounded-full border" style={{color: degree.color, borderColor: degree.color}}>
        <span>{degree.name}</span>
      </div>
      <span>{user.minor == "NONE" ? false : user.minor}</span>
    </div>
  );
}
 */

import UserComponent from '@/components/pages/subpages/user/userProfile';

export default function UserPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <UserComponent username={params.username} />
  );
}
