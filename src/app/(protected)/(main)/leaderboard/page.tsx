import UsersList from "@/components/pages/leaderboard/UsersList";

export default function Leaderboard() {
  return (
    <div className="flex flex-col py-8 gap-y-4">
      <h1 className="text-4xl font-bold px-4">Leaderboard</h1>
      <UsersList />
    </div>
  );
}
