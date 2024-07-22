import UserCard from "@/components/pages/leaderboard/UserCard";
import { getAllUsersWithOrgs } from "@/db/users"; // Update this to fetch users with their orgs

async function UsersList() {
  try {
    const users = await getAllUsersWithOrgs(); // Ensure this fetches orgs for each user
    return (
      <div className={"flex flex-col space-y-2 scrollbar-hide"}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} orgs={user.orgs} />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <span>Something went wrong</span>;
  }
}

export default UsersList;
