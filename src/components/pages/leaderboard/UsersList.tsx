import { getAllUsersWithOrgs } from "@/db/users"; // Update this to fetch users with their orgs
import UserCard from "@/components/ui/UserCard";

async function UsersList() {
  try {
    const users = await getAllUsersWithOrgs(); // Ensure this fetches orgs for each user
    return users.map((user) => (
      <UserCard key={user.id} user={user} orgs={user.orgs} />
    ));
  } catch (error) {
    console.log(error);
    return <span>Something went wrong =(</span>;
  }
}

export default UsersList;
