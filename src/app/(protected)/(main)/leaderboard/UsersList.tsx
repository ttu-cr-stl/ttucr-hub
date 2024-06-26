import { getAllUsers } from "@/db/users";
import UserCard from "@/components/ui/UserCard";

async function UsersList() {
  try {
    const users = await getAllUsers();
    return users.map((user) => <UserCard key={user.id} user={user} />);
  } catch (error) {
    console.log(error);
    return <span>Something went wrong =(</span>;
  }
}

export default UsersList;
