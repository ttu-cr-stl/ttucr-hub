import UserCard from "@/components/pages/leaderboard/UserCard";
import { getAllUsersWithOrgs } from "@/db/users"; 

async function UsersList() {
  try {
    const users = await getAllUsersWithOrgs(); 

    return (
      <div className={"flex flex-col space-y-2 pb-8"}>
        {users
          .sort((a, b) => {
            if (b.points !== a.points) {
              return b.points - a.points; // Sort by points descending
            }
            return a.firstName.localeCompare(b.firstName); // Then by first name ascending
          })
          .map((user) => (
            <UserCard key={user.username} user={user} />
          ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <span>Something went wrong</span>;
  }
}

export default UsersList;