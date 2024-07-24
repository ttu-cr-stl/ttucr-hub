import UserCard from "@/components/pages/leaderboard/UserCard";
import { getAllUsersWithOrgs } from "@/db/users"; 

async function UsersList() {
  try {
    const users = await getAllUsersWithOrgs(); 

    return (
      <div className={"flex flex-col space-y-2 pb-8"}>
        {users.sort((a, b) => a.lastName > b.lastName ? 1 : -1).map((user) => (
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
