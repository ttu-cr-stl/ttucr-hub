import UsersList from "@/components/pages/leaderboard/UsersList";

export const revalidate = 0;

export default function Leaderboard() {
  return (
    <div className="flex flex-col mt-8 gap-y-4">
      <h1 className="text-3xl font-bold">Rankings</h1>
      <UsersList />
    </div>
  );
}
